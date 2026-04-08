import { query, getConnection } from '../database/connection.js';
import type { LeadEntity, NewsletterEntity } from '../types/leads.types.js';
import oracledb from 'oracledb';

/**
 * Repository: Leads
 * Handles all database operations for the leads table.
 * Adapted for Oracle Database.
 */

export async function insertLead(data: {
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
}): Promise<{ insertId: number }> {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      `INSERT INTO leads 
         (nome, email, telefone, cpf_hash, cep, concessionaria, modelo_interesse, lgpd_consent, lgpd_consent_at, ip_masked)
       VALUES (:nome, :email, :telefone, :cpf_hash, :cep, :concessionaria, :modelo_interesse, :lgpd_consent, :lgpd_consent_at, :ip_masked)
       RETURNING id INTO :insertId`,
      {
        nome: data.nome,
        email: data.email,
        telefone: data.telefone,
        cpf_hash: data.cpf_hash,
        cep: data.cep,
        concessionaria: data.concessionaria,
        modelo_interesse: data.modelo_interesse,
        lgpd_consent: data.lgpd_consent ? 1 : 0,
        lgpd_consent_at: data.lgpd_consent_at,
        ip_masked: data.ip_masked,
        insertId: { type: oracledb.NUMBER, dir: oracledb.BIND_OUT }
      }
    );
    const idList = (result.outBinds as any).insertId;
    return { insertId: Number(idList && idList[0]) || 0 };
  } finally {
    await connection.close();
  }
}

export async function findLeadById(id: number): Promise<LeadEntity | null> {
  const rows = await query<LeadEntity>(
    'SELECT * FROM leads WHERE id = :id FETCH FIRST 1 ROWS ONLY',
    { id }
  );
  return rows.length > 0 ? rows[0] : null;
}

export async function findLeadByEmail(email: string): Promise<LeadEntity | null> {
  const rows = await query<LeadEntity>(
    'SELECT * FROM leads WHERE email = :email ORDER BY created_at DESC FETCH FIRST 1 ROWS ONLY',
    { email }
  );
  return rows.length > 0 ? rows[0] : null;
}

/**
 * Newsletter subscriber operations.
 */

export async function insertNewsletterSubscriber(data: {
  email: string;
  lgpd_consent: boolean;
  lgpd_consent_at: Date;
}): Promise<{ insertId: number }> {
  const connection = await getConnection();
  try {
    // MERGE logic for Oracle
    await connection.execute(
      `MERGE INTO newsletter_subscribers target
       USING (SELECT :email AS email FROM DUAL) source
       ON (target.email = source.email)
       WHEN MATCHED THEN 
         UPDATE SET 
           is_active = 1,
           lgpd_consent = :lgpd_consent,
           lgpd_consent_at = :lgpd_consent_at
       WHEN NOT MATCHED THEN
         INSERT (email, lgpd_consent, lgpd_consent_at)
         VALUES (:email, :lgpd_consent, :lgpd_consent_at)`,
      { 
        email: data.email, 
        lgpd_consent: data.lgpd_consent ? 1 : 0, 
        lgpd_consent_at: data.lgpd_consent_at 
      }
    );

    // Fetch the affected ID since MERGE doesn't natively return it cleanly via DML RETURNING in Oracle 
    const result = await connection.execute<any>(
      'SELECT id FROM newsletter_subscribers WHERE email = :email',
      { email: data.email }
    );

    const val = result.rows && result.rows[0];
    const id = val ? (val.ID || val.id) : 0;
    
    return { insertId: Number(id) || 0 };
  } finally {
    await connection.close();
  }
}

export async function findNewsletterByEmail(email: string): Promise<NewsletterEntity | null> {
  const rows = await query<NewsletterEntity>(
    'SELECT * FROM newsletter_subscribers WHERE email = :email FETCH FIRST 1 ROWS ONLY',
    { email }
  );
  return rows.length > 0 ? rows[0] : null;
}
