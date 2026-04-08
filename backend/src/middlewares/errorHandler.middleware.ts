import type { Request, Response, NextFunction } from 'express';
import type { ApiResponse } from '../types/api.types.js';

/**
 * Global error handler.
 * Catches unhandled errors and returns a clean API response.
 * LGPD: NEVER exposes stack traces or sensitive data in production.
 */
export function errorHandler(
  err: Error,
  _req: Request,
  res: Response<ApiResponse>,
  _next: NextFunction,
): void {
  const isDev = process.env.NODE_ENV === 'development';

  // Log error server-side (sanitize sensitive fields)
  console.error(`[ERROR] ${err.message}`);
  if (isDev) console.error(err.stack);

  res.status(500).json({
    success: false,
    error: {
      code: 'INTERNAL_SERVER_ERROR',
      message: isDev
        ? err.message
        : 'Ocorreu um erro interno. Tente novamente mais tarde.',
    },
  });
}
