import { Events, GatewayIntentBits } from 'discord.js';

import { env } from '@Configs/env';

import { MathBotClient } from './client';

const client = new MathBotClient({
  intents: [GatewayIntentBits.Guilds],
});

async function bootstrap() {
  await client.login(env.DISCORD_BOT_TOKEN);

  await client.loadSlashCommands();

  await client.registerSlashCommandsOnDiscordRestAPI();
}

bootstrap();

client.once(Events.ClientReady, (client) => {
  console.log(`Math Bot ready: logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found`);
    return;
  }

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
  }
});
