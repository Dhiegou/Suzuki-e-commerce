import 'dotenv/config';
import express from 'express';
import { createCorsMiddleware } from './middlewares/cors.middleware.js';
import { generalLimiter } from './middlewares/rateLimiter.middleware.js';
import { sanitizerMiddleware } from './middlewares/sanitizer.middleware.js';
import { errorHandler } from './middlewares/errorHandler.middleware.js';
import apiRoutes from './routes/index.js';
import { testConnection } from './database/connection.js';

// ── App Creation ──

const app = express();
const PORT = parseInt(process.env.PORT || '3001', 10);

// ── Global Middlewares ──

app.use(createCorsMiddleware());           // CORS (frontend origin only)
app.use(express.json({ limit: '1mb' }));   // JSON body parser
app.use(generalLimiter);                   // Rate limiting (100 req/15min)
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
    console.warn('[Server] ⚠️  Starting without database connection. Some endpoints may fail.');
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log('');
    console.log('  ╔══════════════════════════════════════════╗');
    console.log('  ║     🏍️  Nova Suzuki — Backend API        ║');
    console.log('  ╠══════════════════════════════════════════╣');
    console.log(`  ║  Local:   http://localhost:${PORT}          ║`);
    console.log(`  ║  API:     http://localhost:${PORT}/api/v1   ║`);
    console.log(`  ║  Health:  http://localhost:${PORT}/api/v1/health ║`);
    console.log('  ╚══════════════════════════════════════════╝');
    console.log('');
  });
}

startServer().catch((err) => {
  console.error('[Server] Fatal error:', err);
  process.exit(1);
});

export default app;
