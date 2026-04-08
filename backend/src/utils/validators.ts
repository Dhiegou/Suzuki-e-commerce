const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Validate an email address format.
 */
export function isValidEmail(email: string): boolean {
  return EMAIL_REGEX.test(email.trim());
}

/**
 * Validate a CPF using modulo-11 algorithm.
 * Same logic as the frontend for consistency.
 */
export function isValidCPF(cpf: string): boolean {
  const digits = cpf.replace(/\D/g, '');

  if (digits.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(digits)) return false;

  for (let t = 9; t <= 10; t++) {
    let sum = 0;
    for (let i = 0; i < t; i++) {
      sum += parseInt(digits.charAt(i)) * (t + 1 - i);
    }
    let remainder = (sum * 10) % 11;
    if (remainder === 10) remainder = 0;
    if (remainder !== parseInt(digits.charAt(t))) return false;
  }

  return true;
}

/**
 * Validate a Brazilian phone number format.
 * Expects: (XX) XXXXX-XXXX (15 chars with mask)
 */
export function isValidPhone(phone: string): boolean {
  const digits = phone.replace(/\D/g, '');
  return digits.length === 10 || digits.length === 11;
}

/**
 * Validate a Brazilian CEP format.
 * Expects: XXXXX-XXX (9 chars with mask)
 */
export function isValidCEP(cep: string): boolean {
  const digits = cep.replace(/\D/g, '');
  return digits.length === 8;
}

/**
 * Strip HTML tags from a string to prevent XSS.
 */
export function sanitizeString(value: string): string {
  return value
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
}

/**
 * Validate a name field.
 */
export function isValidName(name: string): boolean {
  const trimmed = name.trim();
  return trimmed.length >= 3 && trimmed.length <= 255;
}
