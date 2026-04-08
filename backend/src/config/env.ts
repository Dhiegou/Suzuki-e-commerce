import { z } from 'zod';
import { logger } from '../utils/logger.js';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.string().default('3001'),
  DB_USER: z.string().min(1),
  DB_PASSWORD: z.string().min(1),
  DB_HOST: z.string().min(1),
  DB_PORT: z.string().default('1521'),
  DB_SERVICE: z.string().min(1),
  ALLOWED_ORIGINS: z.string().default('http://localhost:3000'),
  REDIS_URL: z.string().optional(),
  LOG_LEVEL: z.string().default('info')
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  logger.fatal({ err: _env.error.format() }, '❌ Invalid environment variables');
  process.exit(1);
}

export const env = _env.data;
