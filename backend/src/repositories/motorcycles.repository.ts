import { query } from '../database/connection.js';
import type { MotorcycleEntity } from '../types/motorcycles.types.js';

/**
 * Repository: Motorcycles
 * Handles all database operations for the motorcycles table.
 */

export async function findAllMotorcycles(activeOnly = true): Promise<MotorcycleEntity[]> {
  const condition = activeOnly ? 'WHERE is_active = 1' : '';
  const rows = await query<MotorcycleEntity>(
    `SELECT * FROM motorcycles ${condition} ORDER BY price ASC`
  );

  // Parse JSON features field
  return rows.map((row) => ({
    ...row,
    features: typeof row.features === 'string'
      ? JSON.parse(row.features)
      : row.features || [],
  }));
}

export async function findMotorcycleById(id: string): Promise<MotorcycleEntity | null> {
  const rows = await query<MotorcycleEntity>(
    'SELECT * FROM motorcycles WHERE id = :id FETCH FIRST 1 ROWS ONLY',
    { id }
  );

  if (rows.length === 0) return null;

  const row = rows[0];
  return {
    ...row,
    features: typeof row.features === 'string'
      ? JSON.parse(row.features)
      : row.features || [],
  };
}
