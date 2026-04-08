import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle } from 'lucide-react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught component error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-ghost-white p-6 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-6">
            <AlertTriangle className="w-8 h-8 text-suzuki-red" />
          </div>
          <h1 className="text-2xl font-bold font-display text-suzuki-blue mb-2">
            Algo deu errado
          </h1>
          <p className="text-suzuki-blue/60 max-w-md text-sm mb-8">
            Encontramos um erro inesperado ao carregar esta interface.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="bg-suzuki-blue text-white px-6 py-3 rounded-full uppercase tracking-wider text-xs font-bold hover:bg-suzuki-red transition-colors"
          >
            Recarregar Página
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}
