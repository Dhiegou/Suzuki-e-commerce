import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import Redis from 'ioredis';
import { logger } from '../utils/logger.js';

// Setup Redis instance
const redisClient = new Redis(process.env.REDIS_URL || 'redis://localhost:6379');

redisClient.on('error', (err) => {
  logger.error({ err }, '[Redis] Error in rate limiter connection');
});

/**
 * Rate limiter for general API usage.
 * Prevents abuse and brute-force attacks.
 * Uses Redis for horizontal scalability.
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,               // 100 requests per window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.call(args[0], ...args.slice(1)) as any,
  }),
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Muitas requisições. Tente novamente em alguns minutos.',
    },
  },
});

/**
 * Stricter rate limiter for lead submission endpoints.
 * Prevents spam form submissions.
 */
export const leadSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 10,                // 10 submissions per hour
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  store: new RedisStore({
    sendCommand: (...args: string[]) => redisClient.call(args[0], ...args.slice(1)) as any,
  }),
  message: {
    success: false,
    error: {
      code: 'SUBMISSION_LIMIT_EXCEEDED',
      message: 'Limite de envios atingido. Tente novamente mais tarde.',
    },
  },
});
