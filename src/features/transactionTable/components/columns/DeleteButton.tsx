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
import { TransactionTableData } from './types';
import { toast } from '@/hooks/use-toast';
import { useTransactionStore } from '@/stores/TransactionStore';

type DeleteButtonProps = {
  transactionToEdit: TransactionTableData;
};

export const DeleteButton = ({ transactionToEdit }: DeleteButtonProps) => {
  const deleteTransaction = useTransactionStore(
    (state) => state.deleteTransaction,
  );

  const handleDeleteTransaction = () => {
    try {
      deleteTransaction(transactionToEdit.id);

      toast({
        title: 'Transakce byla úspěšně smazána',
        duration: 5000,
        className: 'bg-green-100 border-green-500 text-green-900',
      });
    } catch (error) {
      console.error('Error deleting transaction:', error);

      toast({
        variant: 'destructive',
        title: 'Nastala chyba při mazání transakce',
      });
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <TrashIcon className="h-4 w-4 text-red-500" />
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
          <AlertDialogAction onClick={handleDeleteTransaction}>
            Smazat
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
