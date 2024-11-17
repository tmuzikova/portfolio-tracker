import { Plus as PlusIcon } from 'lucide-react';
import { Button } from './ui/button';

export const AddTransactionButton = () => {
  return (
    <Button className="!h-[48px] !w-[48px]">
      <span>
        <PlusIcon className="!h-6 !w-6" />
      </span>
    </Button>
  );
};
