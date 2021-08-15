import { CommandInteraction } from "discord.js";
import { Collection } from "mongodb";
import { getWoofCount, incrementWoofCount } from "./data";
import { WoofDocument } from "./woof-document";

declare type CommandHandler = {
  [key: string]: (
    command: any,
    woofCollection: Collection<WoofDocument>
  ) => Promise<void>;
};

export const CommandHandlers: CommandHandler = {
  woof: async (
    interactionCommand: CommandInteraction,
    woofCollection: Collection<WoofDocument>
  ) => {
    const count = interactionCommand.options.getInteger("count") || 1;

    if (count < 1 || count > 10) {
      await interactionCommand.reply({
        content: `Woof count increase must be between 1 and 10.`,
        ephemeral: true,
      });

      return;
    }

    await incrementWoofCount(count, woofCollection);

    await interactionCommand.reply({
      content: `Woof count increased by ${count}`,
      ephemeral: true,
    });
  },
  woofcount: async (
    interactionCommand: CommandInteraction,
    woofCollection: Collection<WoofDocument>
  ) => {
    const woofCount = await getWoofCount(woofCollection);
    await interactionCommand.reply(
      `The current Kaiser woof count is ${woofCount}`
    );
  },
};
