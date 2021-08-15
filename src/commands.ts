import { SlashCommandBuilder } from "@discordjs/builders";

export const Commands = [
  new SlashCommandBuilder()
    .setName("woof")
    .setDescription("Adds to the Kaiser woof count")
    .addIntegerOption((option) =>
      option
        .setName("count")
        .setDescription("The number of Kaiser woofs to add to the count")
        .setRequired(false)
    ),
  new SlashCommandBuilder()
    .setName("woofcount")
    .setDescription("Gets the current Kaiser woof count"),
];
