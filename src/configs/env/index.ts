import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'production'] as const)
    .default('production'),
  DISCORD_BOT_TOKEN: z.string(),
  DISCORD_CLIENT_ID: z.string(),
});

const parseResult = envSchema.safeParse(process.env);

if (!parseResult.success) {
  throw new Error('Incorrect environment variables');
}

export const env = parseResult.data;
