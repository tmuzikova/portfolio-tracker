import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import {
  AlertCircle as AlertCircleIcon,
  ArrowLeft as ArrowLeftIcon,
} from 'lucide-react';

export const ErrorPage = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-slate-100 text-slate-800">
      <Card className="w-full max-w-md rounded-md shadow-md">
        <CardHeader className="flex flex-col items-center gap-4">
          <AlertCircleIcon className="h-12 w-12 text-destructive" />
          <CardTitle className="text-2xl font-bold">
            Něco se nepovedlo
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-center text-slate-600">
            Zkuste to prosím znovu později.
          </p>
          <Link to="/">
            <Button
              variant="default"
              className="flex items-center gap-2 bg-primary text-white hover:bg-primary/90"
            >
              <ArrowLeftIcon className="h-5 w-5" />
              Zpět domů
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
};
