import { CommandInteraction, SlashCommandBuilder } from 'discord.js';

import { Command } from '../../abstractions/command';

class ParseCommand extends SlashCommandBuilder {
  public constructor() {
    super();
    this.setName('parse');
    this.setDescription('Receives a LaTeX string and returns a image. If the LaTeX string is invalid, return an error message.');
    this.addStringOption((option) => {
      return option.setName('input')
        .setDescription('The LaTeX string.')
        .setRequired(true);
    });
  }
}

module.exports = <Command>{
  data: new ParseCommand(),
  async execute(interaction: CommandInteraction) {
    await interaction.reply('Nice');
  }
};
