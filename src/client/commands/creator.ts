import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from 'discord.js';

import { Command } from '../../abstractions/command';

class CreatorEmbedded extends EmbedBuilder {
  public constructor() {
    super();
    this.setColor(0x3700FF)
      .setTitle('Creator of Math Bot')
      .setURL('https://github.com/marechal-dev')
      .setAuthor({
        name: 'Pietro Piva Vieira',
        iconURL: 'https://github.com/marechal-dev.png',
        url: 'https://github.com/marechal-dev',
      })
      .setThumbnail('https://github.com/marechal-dev.png')
      .setDescription('Hi! My name is Pietro aka Marechal, and I\'m the proud developer of this bot :D\nI\'m a FullStack Software Engineer and Math Enthusiast ;)\nMy main techs are JS/TS (Node.js), NestJS, C# (ASP.NET), Golang, ReactJS, Next.js and React Native.')
      .setFields(
        { name: '\u200B', value: '\u200B' },
        {
          name: 'Math Bot GitHub Repository',
          value: 'https://github.com/marechal-dev/math-bot',
          inline: true,
        },
        {
          name: 'My LinkedIn',
          value: 'https://www.linkedin.com/in/pietro-vieira/',
          inline: true,
        }
      )
      .setImage('https://i.imgur.com/wRBoTyO.jpg')
      .setTimestamp()
      .setFooter({
        text: 'Thanks for using Math Bot :D',
      });
  }
}

class CreatorCommand extends SlashCommandBuilder {
  public constructor() {
    super();
    this.setName('creator');
    this.setDescription('Replies with the Math Bot creator info!');
  }
}

module.exports = <Command>{
  data: new CreatorCommand(),
  async execute(interaction: CommandInteraction) {
    await interaction.reply({
      embeds: [new CreatorEmbedded()],
    });
  }
};
