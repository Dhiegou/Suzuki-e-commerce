import { Router } from 'express';
import * as leadsController from '../controllers/leads.controller.js';
import { leadSubmissionLimiter } from '../middlewares/rateLimiter.middleware.js';

const router = Router();

/**
 * POST /api/v1/leads/contact
 * Submit a contact/interest lead form.
 * Rate limited: 10 submissions per hour.
 */
router.post('/contact', leadSubmissionLimiter, leadsController.createContactLead);

/**
 * POST /api/v1/leads/newsletter
 * Subscribe to the newsletter.
 * Rate limited: 10 submissions per hour.
 */
router.post('/newsletter', leadSubmissionLimiter, leadsController.createNewsletterSubscription);

export default router;
