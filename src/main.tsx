import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { GarageProvider } from './contexts/GarageContext';
import './index.css';

// Override global: Impede nativamente o navegador de restaurar a barra de rolagem
if (typeof window !== 'undefined' && 'history' in window) {
  window.history.scrollRestoration = 'manual';
  
  // Limpa também qualquer âncora residual na URL (que tentaria rolar a página depois do start)
  if (window.location.hash) {
    window.history.replaceState('', document.title, window.location.pathname + window.location.search);
  }
}

// Força o reset do scroll logo antes de começar a pintar o DOM do projeto
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GarageProvider>
      <App />
    </GarageProvider>
  </StrictMode>,
);
