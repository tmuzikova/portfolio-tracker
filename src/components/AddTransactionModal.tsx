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
import { TransactionTableData } from '@/features/transactionTable/components/columns/types';

type AddTransactionModalProps = {
  children: React.ReactNode;
  transactionToEdit?: TransactionTableData;
};

export const AddTransactionModal = ({
  children,
  transactionToEdit,
}: AddTransactionModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mx-auto text-[28px]">
            {transactionToEdit ? 'Upravte transakci' : 'Přidejte transakci'}
          </DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <AddTransactionForm
          transactionToEdit={transactionToEdit}
          onClose={() => setIsOpen(false)}
          onReopen={() => {
            setIsOpen(true);
          }}
        />
      </DialogContent>
    </Dialog>
  );
};
