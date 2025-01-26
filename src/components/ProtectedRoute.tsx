import { Navigate } from 'react-router-dom';
import { useAuth } from '@/providers/AuthContextProvider';
import { LoadingState } from './LoadingState';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { session, loading } = useAuth();

  if (loading) {
    return <LoadingState />;
  }

  if (!session) {
    return <Navigate to="/signin" />;
  }

  return children;
};
