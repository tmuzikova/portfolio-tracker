import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { AddTransactionForm } from './AddTransactionForm/AddTransactionForm';
import { useState } from 'react';

type AddTransactionModalProps = {
  children: React.ReactNode;
};

export const AddTransactionModal = ({ children }: AddTransactionModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mx-auto text-[28px]">
            Přidejte transakci
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <AddTransactionForm
          onClose={() => setIsOpen(false)}
          onReopen={() => {
            setIsOpen(true);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
