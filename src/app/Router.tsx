import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Dashboard } from '@/features/dashboard/pages/Dashboard';
import { TransactionTablePage } from '@/features/transactionTable/pages/TransactionTablePage';
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
        element: <TransactionTablePage />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
