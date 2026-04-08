import { Router } from 'express';
import * as motorcyclesController from '../controllers/motorcycles.controller.js';

const router = Router();

/**
 * GET /api/v1/motorcycles
 * List all active motorcycles.
 */
router.get('/', motorcyclesController.listMotorcycles);

/**
 * GET /api/v1/motorcycles/:id
 * Get a specific motorcycle by ID.
 */
router.get('/:id', motorcyclesController.getMotorcycleById);

export default router;
