import { hashCPF, maskIP } from '../utils/crypto.js';
import * as leadsRepo from '../repositories/leads.repository.js';
import type {
  CreateContactLeadDTO,
  CreateNewsletterLeadDTO,
  LeadResponseDTO,
  NewsletterResponseDTO,
} from '../types/leads.types.js';
import { z } from 'zod';

// ── Validation Errors ──

interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

// ── Schema Validation with Zod ──

// Modulo 11 check for CPF inside Zod refining
function isValidCPFRuntime(cpf: string): boolean {
  const d = cpf.replace(/\D/g, '');
  if (d.length !== 11 || /^(\d)\1{10}$/.test(d)) return false;
  for (let t = 9; t <= 10; t++) {
    let sum = 0;
    for (let i = 0; i < t; i++) {
      sum += parseInt(d.charAt(i)) * (t + 1 - i);
    }
    let rem = (sum * 10) % 11;
    if (rem === 10) rem = 0;
    if (rem !== parseInt(d.charAt(t))) return false;
  }
  return true;
}

const contactLeadSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  cpf: z.string().refine(isValidCPFRuntime, 'CPF inválido'),
  telefone: z.string().min(14, 'Telefone inválido'), // Adjust based on mask
  cep: z.string().min(8, 'CEP inválido'),
  concessionaria: z.string().min(1, 'Selecione uma concessionária'),
  modeloInteresse: z.string().optional(),
  lgpdConsent: z.boolean().refine((val) => val === true, 'O consentimento LGPD é obrigatório para envio'),
});

const newsletterLeadSchema = z.object({
  email: z.string().email('E-mail inválido'),
  lgpdConsent: z.boolean().refine((val) => val === true, 'O consentimento LGPD é obrigatório'),
});

function parseZodErrors(error: z.ZodError<any>): Record<string, string> {
  const errorObj: Record<string, string> = {};
  error.issues.forEach((e: z.ZodIssue) => {
    if (e.path && e.path[0]) {
      errorObj[e.path[0].toString()] = e.message;
    }
  });
  return errorObj;
}

/**
 * Validate a contact lead submission using Zod.
 */
function validateContactLead(data: CreateContactLeadDTO): ValidationResult {
  const result = contactLeadSchema.safeParse(data);
  if (!result.success) {
    return { valid: false, errors: parseZodErrors(result.error) };
  }
  return { valid: true, errors: {} };
}

/**
 * Create a new contact/interest lead.
 * Enforces LGPD: hashes CPF, masks IP, requires consent.
 */
export async function createContactLead(
  data: CreateContactLeadDTO,
  clientIP?: string,
): Promise<{ lead: LeadResponseDTO } | { validationErrors: Record<string, string> }> {
  // Step 1: Validate
  const validation = validateContactLead(data);
  if (!validation.valid) {
    return { validationErrors: validation.errors };
  }

  // Step 2: LGPD-compliant data transformation
  const cpfHash = hashCPF(data.cpf);
  const maskedIP = maskIP(clientIP);
  const consentTimestamp = new Date();

  // Step 3: Persist via repository
  const result = await leadsRepo.insertLead({
    nome: data.nome.trim(),
    email: data.email.trim().toLowerCase(),
    telefone: data.telefone.trim(),
    cpf_hash: cpfHash,
    cep: data.cep.trim(),
    concessionaria: data.concessionaria,
    modelo_interesse: data.modeloInteresse || null,
    lgpd_consent: true,
    lgpd_consent_at: consentTimestamp,
    ip_masked: maskedIP,
  });

  // Step 4: Return sanitized response (no CPF, no IP)
  return {
    lead: {
      id: result.insertId,
      nome: data.nome.trim(),
      email: data.email.trim().toLowerCase(),
      concessionaria: data.concessionaria,
      modeloInteresse: data.modeloInteresse || null,
      createdAt: consentTimestamp.toISOString(),
    },
  };
}

/**
 * Validate a newsletter subscription using Zod.
 */
function validateNewsletterLead(data: CreateNewsletterLeadDTO): ValidationResult {
  const result = newsletterLeadSchema.safeParse(data);
  if (!result.success) {
    return { valid: false, errors: parseZodErrors(result.error) };
  }
  return { valid: true, errors: {} };
}

/**
 * Subscribe to the newsletter.
 * Uses UPSERT to re-activate existing subscribers.
 */
export async function createNewsletterSubscription(
  data: CreateNewsletterLeadDTO,
): Promise<{ subscriber: NewsletterResponseDTO } | { validationErrors: Record<string, string> }> {
  const validation = validateNewsletterLead(data);
  if (!validation.valid) {
    return { validationErrors: validation.errors };
  }

  const consentTimestamp = new Date();

  const result = await leadsRepo.insertNewsletterSubscriber({
    email: data.email.trim().toLowerCase(),
    lgpd_consent: true,
    lgpd_consent_at: consentTimestamp,
  });

  return {
    subscriber: {
      id: result.insertId,
      email: data.email.trim().toLowerCase(),
      createdAt: consentTimestamp.toISOString(),
    },
  };
}
