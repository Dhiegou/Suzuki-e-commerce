import type { Request, Response } from 'express';
import type { ApiResponse } from '../types/api.types.js';
import type { MotorcycleResponseDTO } from '../types/motorcycles.types.js';
import * as motorcyclesService from '../services/motorcycles.service.js';

/**
 * Controller: List Motorcycles (GET /api/v1/motorcycles)
 */
export async function listMotorcycles(
  _req: Request,
  res: Response<ApiResponse<MotorcycleResponseDTO[]>>,
): Promise<void> {
  try {
    const motorcycles = await motorcyclesService.getAllMotorcycles();

    res.status(200).json({
      success: true,
      data: motorcycles,
    });
  } catch (error) {
    console.error('[MotorcyclesController] listMotorcycles error:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro ao buscar catálogo de motos.',
      },
    });
  }
}

/**
 * Controller: Get Motorcycle by ID (GET /api/v1/motorcycles/:id)
 */
export async function getMotorcycleById(
  req: Request,
  res: Response<ApiResponse<MotorcycleResponseDTO>>,
): Promise<void> {
  try {
    const motorcycle = await motorcyclesService.getMotorcycleById(req.params.id);

    if (!motorcycle) {
      res.status(404).json({
        success: false,
        error: {
          code: 'NOT_FOUND',
          message: 'Moto não encontrada.',
        },
      });
      return;
    }

    res.status(200).json({
      success: true,
      data: motorcycle,
    });
  } catch (error) {
    console.error('[MotorcyclesController] getMotorcycleById error:', (error as Error).message);
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro ao buscar moto.',
      },
    });
  }
}
