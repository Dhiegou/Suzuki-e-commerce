import type { LeadFormData } from '../components/LeadForm/LeadForm.types';

const API_BASE_URL = '/api/v1';

export class ApiError extends Error {
  constructor(
    public message: string,
    public code?: string,
    public details?: Record<string, string>,
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    const errorMsg = data?.error?.message || 'Erro na comunicação com o servidor';
    throw new ApiError(errorMsg, data?.error?.code, data?.error?.details);
  }

  if (data && !data.success) {
    throw new ApiError(data.error?.message || 'Erro desconhecido', data.error?.code, data.error?.details);
  }

  return data?.data as T;
}

export const apiService = {
  /**
   * Submit contact lead
   */
  submitContactLead: async (leadData: LeadFormData, selectedModel?: string) => {
    const response = await fetch(`${API_BASE_URL}/leads/contact`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...leadData,
        modeloInteresse: selectedModel || '',
      }),
    });

    return handleResponse(response);
  },

  /**
   * Submit newsletter lead
   */
  submitNewsletter: async (email: string, lgpdConsent: boolean) => {
    const response = await fetch(`${API_BASE_URL}/leads/newsletter`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, lgpdConsent }),
    });

    return handleResponse(response);
  },
  
  /**
   * Check Backend Health
   */
  checkHealth: async () => {
    const response = await fetch(`${API_BASE_URL}/health`);
    return handleResponse(response);
  },

  /**
   * Fetch all motorcycles
   */
  getMotorcycles: async () => {
    const response = await fetch(`${API_BASE_URL}/motorcycles`);
    return handleResponse<any[]>(response);
  }
};
