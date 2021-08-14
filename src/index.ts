import { Client, Intents } from "discord.js";



client.on('ready', () => {
  console.log(`logged in as ${client?.user?.tag}`);
});

console.log('HI');

(async () => {
  const client = new Client({intents: Intents.FLAGS.GUILDS});

  await client.login(process.env.BOT_TOKEN);
})();