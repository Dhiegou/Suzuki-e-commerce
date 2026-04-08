import rateLimit from 'express-rate-limit';

/**
 * Rate limiter for general API usage.
 * Prevents abuse and brute-force attacks.
 */
export const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100,               // 100 requests per window
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'RATE_LIMIT_EXCEEDED',
      message: 'Muitas requisições. Tente novamente em alguns minutos.',
    },
  },
});

/**
 * Stricter rate limiter for lead submission endpoints.
 * Prevents spam form submissions.
 */
export const leadSubmissionLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 10,                // 10 submissions per hour
  standardHeaders: 'draft-7',
  legacyHeaders: false,
  message: {
    success: false,
    error: {
      code: 'SUBMISSION_LIMIT_EXCEEDED',
      message: 'Limite de envios atingido. Tente novamente mais tarde.',
    },
  },
});
