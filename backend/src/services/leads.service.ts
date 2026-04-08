import {
  isValidEmail,
  isValidCPF,
  isValidPhone,
  isValidCEP,
  isValidName,
} from '../utils/validators.js';
import { hashCPF, maskIP } from '../utils/crypto.js';
import * as leadsRepo from '../repositories/leads.repository.js';
import type {
  CreateContactLeadDTO,
  CreateNewsletterLeadDTO,
  LeadResponseDTO,
  NewsletterResponseDTO,
} from '../types/leads.types.js';

// ── Validation Errors ──

interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

/**
 * Validate a contact lead submission.
 * ALL business rules are enforced here — controllers are thin.
 */
function validateContactLead(data: CreateContactLeadDTO): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.nome || !isValidName(data.nome)) {
    errors.nome = 'Nome deve ter pelo menos 3 caracteres';
  }

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'E-mail inválido';
  }

  if (!data.cpf || !isValidCPF(data.cpf)) {
    errors.cpf = 'CPF inválido';
  }

  if (!data.telefone || !isValidPhone(data.telefone)) {
    errors.telefone = 'Telefone inválido';
  }

  if (!data.cep || !isValidCEP(data.cep)) {
    errors.cep = 'CEP inválido';
  }

  if (!data.concessionaria) {
    errors.concessionaria = 'Selecione uma concessionária';
  }

  // LGPD: Consent is MANDATORY
  if (!data.lgpdConsent) {
    errors.lgpdConsent = 'O consentimento LGPD é obrigatório para envio';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
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
 * Validate a newsletter subscription.
 */
function validateNewsletterLead(data: CreateNewsletterLeadDTO): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.email || !isValidEmail(data.email)) {
    errors.email = 'E-mail inválido';
  }

  if (!data.lgpdConsent) {
    errors.lgpdConsent = 'O consentimento LGPD é obrigatório';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
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
