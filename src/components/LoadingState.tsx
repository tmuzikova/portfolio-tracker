import { Loader as LoaderIcon } from 'lucide-react';

export const LoadingState = () => (
  <div className="flex h-64 w-full items-center justify-center">
    <LoaderIcon className="h-8 w-8 animate-spin text-slate-500" />
  </div>
);
