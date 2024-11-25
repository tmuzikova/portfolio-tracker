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

type DeleteButtonProps = {
  transactionToEdit: TransactionTableData;
};

export const DeleteButton = ({ transactionToEdit }: DeleteButtonProps) => {
  const handleDeleteTransaction = () => {
    try {
      const existingTransactions = JSON.parse(
        localStorage.getItem('transactions') || '[]',
      ) as TransactionTableData[];

      const updatedTransactions = existingTransactions.filter(
        (transaction) => transaction.id !== transactionToEdit.id,
      );

      localStorage.setItem('transactions', JSON.stringify(updatedTransactions));

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
