import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Trash as TrashIcon } from 'lucide-react';
import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';
import { useTransactionStore } from '@/stores/TransactionStore';

type Props = {
  transactionId: TransactionTableData['id'];
};

export const DeleteButton = ({ transactionId }: Props) => {
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction,
  );

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <TrashIcon className="h-4 w-4 text-destructive" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Opravdu chcete smazat tuto transakci?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Transakce bude trvale odstraněna.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Zrušit</AlertDialogCancel>
          <AlertDialogAction onClick={() => deleteTransaction(transactionId)}>
            Smazat
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
