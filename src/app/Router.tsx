import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Dashboard } from '@/features/dashboard/pages/Dashboard';
import { TransactionTablePage } from '@/features/transactionTable/pages/TransactionTablePage';
import { ErrorPage } from '@/components/ErrorPage';
import { StockCardPage } from '@/features/stockCard/pages/StockCardPage';
import { SignInPage } from '@/features/auth/pages/SignInPage';

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
        element: <Dashboard />,
      },
      {
        path: '/transaction-table',
        element: <TransactionTablePage />,
      },
      {
        path: '/detail/:symbol',
        element: <StockCardPage />,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

export default router;
