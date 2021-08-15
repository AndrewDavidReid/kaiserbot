import { Client, Intents } from "discord.js";
import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { Commands } from "./commands";
import { CommandHandlers } from "./command-handlers";
import { MongoClient } from "mongodb";

const token = process.env.BOT_TOKEN as string;
const clientId = process.env.CLIENT_ID as string;
const guildId = process.env.GUILD_ID as string;
const environmentName = process.env.ENVIRONMENT as string;
const mongodbConnectionString = process.env.MONGODB_CONNSTR as string;

// Register commands.
(async () => {
  try {
    const rest = new REST({ version: "9" }).setToken(token);

    console.log("Started refreshing application (/) commands.");

    if (environmentName === "Prod") {
      console.log("registering commands as global commands.");
      await rest.put(Routes.applicationCommands(clientId), { body: Commands });
    } else {
      console.log("registering commands as guild commmands.");
      await rest.put(Routes.applicationGuildCommands(clientId, guildId), {
        body: Commands,
      });
    }

    console.log("Successfully reloaded application (/) commands.");
  } catch (error) {
    console.error(error);
  }
})();

// Register bot interactions.
(async () => {
  const client = new Client({ intents: Intents.FLAGS.GUILDS });
  const mongoClient = new MongoClient(mongodbConnectionString);

  try {
    await mongoClient.connect();

    // Grab onto the woof collection.
    const woofCollection = mongoClient
      .db(`kaiserbotdb-${environmentName.toLowerCase()}`)
      .collection("woofs");

    client.on("ready", () => {
      console.log(`logged in as ${client?.user?.tag}`);
    });

    client.on("interactionCreate", async (interaction) => {
      if (!interaction.isCommand()) return;

      const { commandName } = interaction;

      try {
        CommandHandlers[commandName](interaction, woofCollection as any);
      } catch (error) {
        console.error(error);
        await interaction.reply({
          content: "There was an error while executing this command!",
          ephemeral: true,
        });
      }
    });

    await client.login(token);
  } catch (e) {
    console.error(e);
  }
})();
