import { Router } from 'express';
import leadsRoutes from './leads.routes.js';
import motorcyclesRoutes from './motorcycles.routes.js';

const router = Router();

/**
 * API v1 Route Aggregator.
 * All routes are prefixed with /api/v1 by the server.
 */
router.use('/leads', leadsRoutes);
router.use('/motorcycles', motorcyclesRoutes);

// Health check
router.get('/health', (_req, res) => {
  res.json({
    success: true,
    data: {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      version: '1.0.0',
    },
  });
});

export default router;
