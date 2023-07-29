/* eslint-disable @typescript-eslint/no-var-requires */
import { promisify } from 'node:util';
import fileSystem from 'node:fs';
import path from 'node:path';

import { Client, ClientOptions, Collection, REST, RESTPutAPIApplicationCommandsResult, RESTPostAPIChatInputApplicationCommandsJSONBody, Routes } from 'discord.js';

import { env } from '@Configs/env';

import { Command } from '../abstractions/command';

const readdirPromisified = promisify(fileSystem.readdir);

export class MathBotClient extends Client {
  private readonly _commands: Collection<string, Command>;
  private readonly _jsonSlashCommands: RESTPostAPIChatInputApplicationCommandsJSONBody[];
  private readonly _discordRestClient: REST;

  public constructor(options: ClientOptions) {
    super(options);
    this._jsonSlashCommands = [];
    this._commands = new Collection<string, Command>();
    this._discordRestClient = new REST().setToken(env.DISCORD_BOT_TOKEN);
  }

  public async loadSlashCommands(): Promise<void> {
    const commandsPath = path.join(__dirname, 'commands');
    const commandsFiles = (await readdirPromisified(commandsPath)).filter((file) => file.endsWith(env.NODE_ENV === 'development' ? '.ts' : '.js'));

    for (const file of commandsFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath) as Command;

      if ('data' in command && 'execute' in command) {
        this._commands.set(command.data.name, command);
        this._jsonSlashCommands.push(command.data.toJSON());
      } else {
        console.log(`[WARNING] The command at ${filePath} is invalid.`);
      }
    }
  }

  public async registerSlashCommandsOnDiscordRestAPI(): Promise<void> {
    try {
      console.log(`[INFO] Started refresing ${this._jsonSlashCommands.length} application (/) commands to Discord REST API.`);

      const response = await this._discordRestClient.put(
        Routes.applicationCommands(env.DISCORD_CLIENT_ID),
        {
          body: this._jsonSlashCommands,
        }
      ) as RESTPutAPIApplicationCommandsResult;

      console.log(`[SUCCESS] Reloaded ${response.length} application (/) commands.`);
    } catch (error) {
      console.error(error);
      throw new Error('Failed reloading application (/) commands.');
    }
  }

  public get commands(): Collection<string, Command> {
    return this._commands;
  }
}
