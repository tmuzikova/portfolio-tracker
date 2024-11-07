import { createBrowserRouter } from 'react-router-dom';
import { Layout } from './Layout/Layout';
import { Dashboard } from '@/features/Dashboard/components/Dashboard';
import { TransactionsTable } from '@/features/TransactionsTable/components/TransactionTable';
import { NotFoundPage } from '@/features/NotFoundPage/NotFoundPage';

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
        path: '/transactionstable',
        element: <TransactionsTable />,
      },
    ],
    errorElement: <NotFoundPage />,
  },
]);

export default router;
