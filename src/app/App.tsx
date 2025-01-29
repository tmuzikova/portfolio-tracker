import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './Router';
import { AuthContextProvider } from '@/providers/AuthContextProvider';
import { useTransactionStore } from '@/stores/TransactionStore';
import { useEffect } from 'react';
import { getSavedTransactions } from '@/utils/getSavedTransactions';

const queryClient = new QueryClient();

function App() {
  const { initializeTransactions } = useTransactionStore();

  useEffect(() => {
    const initialTransactions = getSavedTransactions();

    initializeTransactions(initialTransactions);
  }, [initializeTransactions]);

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
