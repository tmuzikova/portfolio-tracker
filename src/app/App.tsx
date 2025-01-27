import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './Router';
import { AuthContextProvider } from '@/providers/AuthContextProvider';
import { useEffect } from 'react';
import { useTransactionStore } from '@/stores/TransactionStore';

const queryClient = new QueryClient();

function App() {
  useEffect(() => {
    useTransactionStore.getState().fetchTransactions();
  }, []);

  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
