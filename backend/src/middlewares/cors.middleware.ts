import cors from 'cors';

/**
 * CORS middleware configured for the Nova Suzuki frontend.
 * Only allows the frontend origin defined in environment.
 */
export function createCorsMiddleware() {
  const origin = process.env.CORS_ORIGIN || 'http://localhost:3000';

  return cors({
    origin,
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
    maxAge: 86400, // 24h preflight cache
  });
}
