import {
  Dialog,
  DialogContent,
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
          <AddTransactionForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
