import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import router from './Router';
import { AuthContextProvider } from '@/providers/AuthContextProvider';

const queryClient = new QueryClient();

function App() {
  return (
    <AuthContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </AuthContextProvider>
  );
}

export default App;
