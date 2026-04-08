import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster, toast } from 'sonner';
import Home from './pages/Home';
import InteressePage from './pages/Interesse/InteressePage';
import { ErrorBoundary } from './components/ErrorBoundary';

// Configure a production-ready QueryClient
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes standard cache
      retry: 2,                 // Retry failed requests twice
      refetchOnWindowFocus: false, // Don't spam backend when switching tabs
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      // Global error handler for data fetching
      toast.error(`Erro de comunicação: ${(error as Error).message}`);
    },
  }),
});

export default function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Toaster position="top-right" richColors />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/interesse" element={<InteressePage />} />
          </Routes>
        </Router>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

