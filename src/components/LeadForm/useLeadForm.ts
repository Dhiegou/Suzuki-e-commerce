import { useCallback, useReducer } from 'react';
import { apiService, ApiError } from '../../services/api';
import type {
  LeadFormData,
  LeadFormErrors,
  SubmitStatus,
  UseLeadFormReturn,
} from './LeadForm.types';

// ── Constants ──

const INITIAL_DATA: LeadFormData = {
  nome: '',
  cpf: '',
  email: '',
  telefone: '',
  cep: '',
  concessionaria: '',
  lgpdConsent: false,
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SENSITIVE_STORAGE_KEYS = ['cpf', 'lead_cpf', 'leadForm', 'leadData'] as const;

// ── Reducer ──

interface FormState {
  data: LeadFormData;
  errors: LeadFormErrors;
  submitStatus: SubmitStatus;
  submitError: string | null;
}

type FormAction =
  | { type: 'FIELD_CHANGE'; field: keyof LeadFormData; value: string | boolean }
  | { type: 'SET_ERRORS'; errors: LeadFormErrors }
  | { type: 'SUBMIT_START' }
  | { type: 'SUBMIT_SUCCESS' }
  | { type: 'SUBMIT_FAILURE'; error: string }
  | { type: 'RESET' };

const INITIAL_STATE: FormState = {
  data: INITIAL_DATA,
  errors: {},
  submitStatus: 'idle',
  submitError: null,
};

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'FIELD_CHANGE': {
      const value =
        typeof action.value === 'string'
          ? applyMask(action.field, action.value)
          : action.value;

      const nextErrors = { ...state.errors };
      delete nextErrors[action.field];

      return {
        ...state,
        data: { ...state.data, [action.field]: value },
        errors: nextErrors,
        submitError: state.submitError ? null : state.submitError,
      };
    }
    case 'SET_ERRORS':
      return { ...state, errors: action.errors };
    case 'SUBMIT_START':
      return { ...state, submitStatus: 'submitting', submitError: null };
    case 'SUBMIT_SUCCESS':
      return { ...state, submitStatus: 'success' };
    case 'SUBMIT_FAILURE':
      return { ...state, submitStatus: 'error', submitError: action.error };
    case 'RESET':
      return INITIAL_STATE;
    default:
      return state;
  }
}

// ── Mask Utilities ──

function applyMask(field: keyof LeadFormData, value: string): string {
  switch (field) {
    case 'cpf':
      return value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})/, '$1-$2')
        .replace(/(-\d{2})\d+?$/, '$1');
    case 'telefone':
      return value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1');
    case 'cep':
      return value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{3})\d+?$/, '$1');
    default:
      return value;
  }
}

// ── CPF Validation (Modulo-11) ──

function isValidCPF(cpf: string): boolean {
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

// ── Validation ──

function validateFormData(data: LeadFormData): LeadFormErrors {
  const e: LeadFormErrors = {};

  const name = data.nome.trim();
  if (!name) e.nome = 'Nome é obrigatório';
  else if (name.length < 3) e.nome = 'Nome deve ter pelo menos 3 caracteres';

  if (!data.cpf || data.cpf.length < 14) e.cpf = 'CPF inválido';
  else if (!isValidCPF(data.cpf)) e.cpf = 'CPF inválido (dígito verificador)';

  if (!data.email || !EMAIL_REGEX.test(data.email)) e.email = 'E-mail inválido';

  if (!data.telefone || data.telefone.length < 15) e.telefone = 'Telefone incompleto';

  if (!data.cep || data.cep.length < 9) e.cep = 'CEP inválido';

  if (!data.concessionaria) e.concessionaria = 'Selecione uma concessionária';

  if (!data.lgpdConsent) e.lgpdConsent = 'O consentimento LGPD é obrigatório para envio';

  return e;
}

// ── LGPD Guard ──

function purgeSensitiveStorage(): void {
  for (const key of SENSITIVE_STORAGE_KEYS) {
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      console.warn(`[LGPD] Removed sensitive key: "${key}"`);
    }
  }
}

// ── Hook ──

export function useLeadForm(onSuccess?: () => void): UseLeadFormReturn {
  const [state, dispatch] = useReducer(formReducer, INITIAL_STATE);

  const handleChange = useCallback(
    (field: keyof LeadFormData, value: string | boolean) => {
      dispatch({ type: 'FIELD_CHANGE', field, value });
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent, selectedModel?: string): Promise<void> => {
      e.preventDefault();

      const errors = validateFormData(state.data);
      if (Object.keys(errors).length > 0) {
        dispatch({ type: 'SET_ERRORS', errors });
        return;
      }

      purgeSensitiveStorage();
      dispatch({ type: 'SUBMIT_START' });

      try {
        await apiService.submitContactLead(state.data, selectedModel);
        dispatch({ type: 'SUBMIT_SUCCESS' });
        onSuccess?.();
      } catch (err) {
        if (err instanceof ApiError && err.code === 'VALIDATION_ERROR' && err.details) {
          dispatch({ type: 'SET_ERRORS', errors: err.details });
          dispatch({ type: 'SUBMIT_FAILURE', error: err.message });
          return;
        }

        const msg =
          err instanceof Error
            ? err.message
            : 'Ocorreu um erro inesperado. Tente novamente.';
        dispatch({ type: 'SUBMIT_FAILURE', error: msg });
      }
    },
    [state.data, onSuccess],
  );

  const resetState = useCallback(() => dispatch({ type: 'RESET' }), []);

  return {
    formData: state.data,
    errors: state.errors,
    submitStatus: state.submitStatus,
    submitError: state.submitError,
    handleChange,
    handleSubmit,
    resetState,
  };
}
