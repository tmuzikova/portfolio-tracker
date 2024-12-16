import { toast } from '@/hooks/useToast';

const DEFAULT_DURATION = 5000;

export const showSuccessToast = (
  message: string,
  duration = DEFAULT_DURATION,
) => {
  toast({
    title: message,
    duration,
    className: 'bg-green-100 border-green-500 text-green-900',
  });
};

export const showErrorToast = (
  message: string,
  action?: JSX.Element,
  duration = DEFAULT_DURATION,
) => {
  toast({
    title: message,
    variant: 'destructive',
    action,
    duration,
  });
};
