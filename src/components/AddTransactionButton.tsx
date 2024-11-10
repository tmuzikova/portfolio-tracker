import { Plus } from 'lucide-react';
import { Button } from './ui/button';

export const AddTransactionButton = () => {
  return (
    <Button className="!h-[48px] !w-[48px]">
      <span>
        <Plus className="!h-6 !w-6" />
      </span>
    </Button>
  );
};
