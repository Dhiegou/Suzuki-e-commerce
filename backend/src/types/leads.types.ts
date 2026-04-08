/**
 * Lead types for the contact/interest form.
 * LGPD: CPF is NEVER stored as plain text — only hashed.
 */

// ── Request DTOs ──

export interface CreateContactLeadDTO {
  nome: string;
  cpf: string;         // Raw CPF (validated + hashed before persistence)
  email: string;
  telefone: string;
  cep: string;
  concessionaria: string;
  modeloInteresse?: string;
  lgpdConsent: boolean;
}

export interface CreateNewsletterLeadDTO {
  email: string;
  lgpdConsent: boolean;
}

// ── Database Entities ──

export interface LeadEntity {
  id: number;
  nome: string;
  email: string;
  telefone: string;
  cpf_hash: string;
  cep: string;
  concessionaria: string;
  modelo_interesse: string | null;
  lgpd_consent: boolean;
  lgpd_consent_at: Date;
  ip_masked: string | null;
  created_at: Date;
  updated_at: Date;
}

export interface NewsletterEntity {
  id: number;
  email: string;
  lgpd_consent: boolean;
  lgpd_consent_at: Date;
  is_active: boolean;
  created_at: Date;
}

// ── Response DTOs ──

export interface LeadResponseDTO {
  id: number;
  nome: string;
  email: string;
  concessionaria: string;
  modeloInteresse: string | null;
  createdAt: string;
}

export interface NewsletterResponseDTO {
  id: number;
  email: string;
  createdAt: string;
}
