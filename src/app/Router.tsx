import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Dashboard } from '@/features/dashboard/pages/Dashboard';
import { TransactionTable } from '@/features/transactionTable/pages/TransactionTable';
import { NotFoundPage } from '@/components/NotFoundPage';

const router = createBrowserRouter([
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
        element: <TransactionTable />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
