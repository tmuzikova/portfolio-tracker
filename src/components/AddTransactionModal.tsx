import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { AddTransactionForm } from './AddTransactionForm/AddTransactionForm';

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
          <DialogDescription />
        </DialogHeader>
        <AddTransactionForm />
      </DialogContent>
    </Dialog>
  );
};
