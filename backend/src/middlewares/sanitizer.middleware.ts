import type { Request, Response, NextFunction } from 'express';
import { sanitizeString } from '../utils/validators.js';

/**
 * Sanitize all string values in request body to prevent XSS.
 * Applied globally before any controller processes the data.
 */
export function sanitizerMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction,
): void {
  if (req.body && typeof req.body === 'object') {
    for (const key of Object.keys(req.body)) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = sanitizeString(req.body[key]);
      }
    }
  }
  next();
}
