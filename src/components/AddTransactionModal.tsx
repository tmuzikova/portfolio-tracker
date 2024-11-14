import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { AddTransactionForm } from './AddTransactionForm';

type AddTransactionModalProps = {
  children: React.ReactNode;
};

export const AddTransactionModal = ({ children }: AddTransactionModalProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mx-auto text-[28px]">
            Přidejte transakci
          </DialogTitle>
          <DialogDescription className="mx-auto max-w-sm text-center">
            Vyplňte níže uvedený formulář a přidejte novou transakci do svého
            portfolia.
          </DialogDescription>
        </DialogHeader>
        <AddTransactionForm />
      </DialogContent>
    </Dialog>
  );
};
