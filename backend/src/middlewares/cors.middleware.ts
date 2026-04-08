import cors from 'cors';
import { env } from '../config/env.js';

/**
 * CORS middleware configured for the Nova Suzuki frontend.
 * Only allows the frontend origin defined in environment.
 */
export function createCorsMiddleware() {
  const allowedOrigins = env.ALLOWED_ORIGINS.split(',').map((o) => o.trim());

  return cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl requests if configured, 
      // but usually we want to block them in a pure web API).
      // If no origin, block or allow based on your security rule.
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24h preflight cache
  });
}

