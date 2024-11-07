import { RouterProvider } from 'react-router-dom';
import router from './Router';

export const Provider = () => {
  return <RouterProvider router={router} />;
};
