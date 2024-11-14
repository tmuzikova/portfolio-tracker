import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './Router';
import { SymbolListProvider } from '@/stores/SymbolListContext';

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SymbolListProvider>
          <RouterProvider router={router} />
        </SymbolListProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
