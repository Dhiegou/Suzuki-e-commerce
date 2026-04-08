import { createHash } from 'node:crypto';

const HASH_SALT = process.env.HASH_SALT || 'nova-suzuki-default-salt-change-me';

/**
 * Hash a CPF using SHA-256 + salt.
 * LGPD: CPF MUST NEVER be stored in plain text.
 *
 * @param cpf - Raw CPF string (with or without mask)
 * @returns SHA-256 hex digest
 */
export function hashCPF(cpf: string): string {
  const digits = cpf.replace(/\D/g, '');
  return createHash('sha256')
    .update(`${HASH_SALT}:${digits}`)
    .digest('hex');
}

/**
 * Mask an IP address for LGPD compliance.
 * Zeroes the last octet of IPv4 addresses.
 *
 * @example maskIP('192.168.1.42') → '192.168.1.0'
 */
export function maskIP(ip: string | undefined): string | null {
  if (!ip) return null;

  // Handle IPv4-mapped IPv6 (::ffff:192.168.1.1)
  const clean = ip.replace(/^::ffff:/, '');

  const parts = clean.split('.');
  if (parts.length === 4) {
    parts[3] = '0';
    return parts.join('.');
  }

  // For IPv6, mask last 2 segments
  const v6Parts = clean.split(':');
  if (v6Parts.length > 2) {
    v6Parts[v6Parts.length - 1] = '0';
    v6Parts[v6Parts.length - 2] = '0';
    return v6Parts.join(':');
  }

  return null;
}
