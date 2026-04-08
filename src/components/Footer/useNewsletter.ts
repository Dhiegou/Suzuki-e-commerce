import { useState, useCallback } from 'react';
import { apiService } from '../../services/api';

export function useNewsletter() {
  const [email, setEmail] = useState('');
  const [lgpdConsent, setLgpdConsent] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const submit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      setErrorMessage('Informe um e-mail válido.');
      setStatus('error');
      return;
    }
    
    if (!lgpdConsent) {
      setErrorMessage('Você deve aceitar os termos de privacidade.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    setErrorMessage('');

    try {
      await apiService.submitNewsletter(email, lgpdConsent);
      setStatus('success');
      setEmail('');
      setLgpdConsent(false);
      
      // Auto-reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(error.message || 'Erro ao realizar inscrição.');
    }
  }, [email, lgpdConsent]);

  return {
    email,
    setEmail,
    lgpdConsent,
    setLgpdConsent,
    status,
    errorMessage,
    submit,
  };
}
