import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Dashboard } from '@/features/dashboard/pages/Dashboard';
import { TransactionTablePage } from '@/features/transactionTable/pages/TransactionTablePage';
import { ErrorPage } from '@/components/ErrorPage';
import { StockCardPage } from '@/features/stockCard/pages/StockCardPage';
import { SignInPage } from '@/features/auth/pages/SignInPage';
import { ProtectedRoute } from './ProtectedRoute';

const router = createBrowserRouter([
  {
    path: '/signin',
    element: <SignInPage />,
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: '/transaction-table',
        element: (
          <ProtectedRoute>
            <TransactionTablePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '/detail/:symbol',
        element: (
          <ProtectedRoute>
            <StockCardPage />
          </ProtectedRoute>
        ),
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
