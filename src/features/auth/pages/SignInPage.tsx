import { useAuth } from '@/app/AuthContextProvider';
import { LoadingState } from '@/components/LoadingState';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Navigate } from 'react-router-dom';
import GoogleLogo from '@/assets/google_logo.svg?react';

export const SignInPage = () => {
  const { signInWithGoogle, session, loading } = useAuth();

  if (loading) return <LoadingState />;
  if (session) return <Navigate to="/" />;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-6">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <div className="mb-6 flex flex-col items-center">
            <img src="/trackfolio.svg" alt="Logo" className="h-16 w-16" />
            <h1 className="mt-4 text-3xl font-bold text-primary">
              Vítejte v Trackfoliu
            </h1>
            <p className="text-md mt-2 text-muted-foreground">
              Spravujte své investice na jednom místě
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Button
            onClick={signInWithGoogle}
            disabled={loading}
            variant="outline"
            className="w-full bg-white shadow-sm hover:bg-slate-50 focus:ring"
          >
            <GoogleLogo className="mr-2 !h-[24px] !w-[24px]" />
            <span className="text-[16px] font-medium text-slate-700">
              Přihlásit pomocí účtu Google
            </span>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};
