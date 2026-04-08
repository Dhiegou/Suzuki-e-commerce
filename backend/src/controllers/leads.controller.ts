import type { Request, Response } from 'express';
import type { ApiResponse } from '../types/api.types.js';
import type { LeadResponseDTO, NewsletterResponseDTO } from '../types/leads.types.js';
import * as leadsService from '../services/leads.service.js';
import { logger } from '../utils/logger.js';

/**
 * Controller: Contact Lead (POST /api/v1/leads/contact)
 * Thin layer — delegates all logic to leadsService.
 */
export async function createContactLead(
  req: Request,
  res: Response<ApiResponse<LeadResponseDTO>>,
): Promise<void> {
  try {
    const clientIP = req.ip || req.socket.remoteAddress;
    const result = await leadsService.createContactLead(req.body, clientIP);

    if ('validationErrors' in result) {
      res.status(422).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dados inválidos. Verifique os campos e tente novamente.',
          details: result.validationErrors,
        },
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: result.lead,
      message: 'Interesse registrado com sucesso!',
    });
  } catch (error) {
    logger.error({ err: error }, '[LeadsController] createContactLead error');
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro ao processar seu interesse. Tente novamente.',
      },
    });
  }
}

/**
 * Controller: Newsletter Subscription (POST /api/v1/leads/newsletter)
 */
export async function createNewsletterSubscription(
  req: Request,
  res: Response<ApiResponse<NewsletterResponseDTO>>,
): Promise<void> {
  try {
    const result = await leadsService.createNewsletterSubscription(req.body);

    if ('validationErrors' in result) {
      res.status(422).json({
        success: false,
        error: {
          code: 'VALIDATION_ERROR',
          message: 'Dados inválidos.',
          details: result.validationErrors,
        },
      });
      return;
    }

    res.status(201).json({
      success: true,
      data: result.subscriber,
      message: 'Inscrição na newsletter realizada com sucesso!',
    });
  } catch (error) {
    logger.error({ err: error }, '[LeadsController] createNewsletterSubscription error');
    res.status(500).json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: 'Erro ao processar sua inscrição. Tente novamente.',
      },
    });
  }
}
