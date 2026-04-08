import * as motorcyclesRepo from '../repositories/motorcycles.repository.js';
import type { MotorcycleResponseDTO } from '../types/motorcycles.types.js';

/**
 * Get all active motorcycles from the catalog.
 * Maps database entities to response DTOs.
 */
export async function getAllMotorcycles(): Promise<MotorcycleResponseDTO[]> {
  const entities = await motorcyclesRepo.findAllMotorcycles(true);

  return entities.map((entity) => ({
    id: entity.id,
    name: entity.name,
    type: entity.type,
    price: Number(entity.price),
    image: entity.image_url,
    description: entity.description || '',
    features: entity.features,
  }));
}

/**
 * Get a single motorcycle by ID.
 */
export async function getMotorcycleById(id: string): Promise<MotorcycleResponseDTO | null> {
  const entity = await motorcyclesRepo.findMotorcycleById(id);
  if (!entity) return null;

  return {
    id: entity.id,
    name: entity.name,
    type: entity.type,
    price: Number(entity.price),
    image: entity.image_url,
    description: entity.description || '',
    features: entity.features,
  };
}
