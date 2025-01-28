import { useAuth } from '@/providers/AuthContextProvider';

type AuthUserData = {
  userName: string;
  userPhoto: string | null;
  userEmail: string | null;
};

export const useAuthUserData = (): AuthUserData => {
  const { session } = useAuth();

  const user = session?.user;
  const userName = user?.user_metadata?.full_name || 'Neznámý uživatel';
  const userPhoto = user?.user_metadata?.avatar_url || null;
  const userEmail = user?.email || null;

  return { userName, userPhoto, userEmail };
};
