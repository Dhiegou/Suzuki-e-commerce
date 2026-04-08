export type SubmitStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface LeadFormData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  cep: string;
  concessionaria: string;
  lgpdConsent: boolean;
}

export type LeadFormErrors = Partial<Record<keyof LeadFormData, string>>;

export interface LeadFormProps {
  onSuccess?: () => void;
  selectedModel?: string;
}

export interface FieldConfig {
  readonly field: keyof LeadFormData;
  readonly label: string;
  readonly placeholder: string;
  readonly type: 'text' | 'email' | 'checkbox' | 'select';
  readonly inputMode?: 'text' | 'numeric' | 'email';
  readonly autoComplete?: string;
  readonly colSpan?: 2;
}

export interface DealershipOption {
  readonly value: string;
  readonly label: string;
}

export interface UseLeadFormReturn {
  formData: LeadFormData;
  errors: LeadFormErrors;
  submitStatus: SubmitStatus;
  submitError: string | null;
  handleChange: (field: keyof LeadFormData, value: string | boolean) => void;
  handleSubmit: (e: React.FormEvent, selectedModel?: string) => Promise<void>;
  resetState: () => void;
}
