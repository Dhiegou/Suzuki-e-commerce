import 'dotenv/config';
import { env } from './config/env.js'; // Must be first after dotenv to validate
import express from 'express';
import helmet from 'helmet';
import { createCorsMiddleware } from './middlewares/cors.middleware.js';
import { generalLimiter } from './middlewares/rateLimiter.middleware.js';
import { sanitizerMiddleware } from './middlewares/sanitizer.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import apiRoutes from './routes/index.js';
import { testConnection } from './database/connection.js';
import { logger } from './utils/logger.js';

// ── App Creation ──

const app = express();
const PORT = parseInt(env.PORT, 10);

// ── Global Middlewares ──

app.use(helmet());                         // Security headers
app.use(createCorsMiddleware());           // CORS (frontend origin only)
app.use(express.json({ limit: '1mb' }));   // JSON body parser
app.use(generalLimiter);                   // Rate limiting (redis-backed)
app.use(sanitizerMiddleware);              // XSS sanitization

// ── Trust proxy (for rate limiter behind reverse proxy) ──
app.set('trust proxy', 1);

// ── API Routes ──

app.use('/api/v1', apiRoutes);

// ── 404 Handler ──

app.use((_req, res) => {
  res.status(404).json({
    success: false,
    error: {
      code: 'NOT_FOUND',
      message: 'Endpoint não encontrado.',
    },
  });
});

// ── Global Error Handler ──

app.use(errorHandler);

// ── Server Startup ──

async function startServer(): Promise<void> {
  // Test database connection
  const dbConnected = await testConnection();
  if (!dbConnected) {
    logger.warn('[Server] ⚠️  Starting without database connection. Some endpoints may fail.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    logger.info('');
    logger.info('  ╔══════════════════════════════════════════╗');
    logger.info('  ║     🏍️  Nova Suzuki — Backend API        ║');
    logger.info('  ╠══════════════════════════════════════════╣');
    logger.info(`  ║  Local:   http://localhost:${PORT}          ║`);
    logger.info(`  ║  API:     http://localhost:${PORT}/api/v1   ║`);
    logger.info(`  ║  Health:  http://localhost:${PORT}/api/v1/health ║`);
    logger.info('  ╚══════════════════════════════════════════╝');
    logger.info('');
  });
}

startServer().catch((err) => {
  logger.fatal({ err }, '[Server] Fatal error');
  process.exit(1);
});

export default app;
