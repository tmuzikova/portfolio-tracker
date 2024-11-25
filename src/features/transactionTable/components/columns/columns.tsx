import { ColumnDef } from '@tanstack/react-table';
import { TableColumnHeader } from '@/components/TableColumnHeader';
import { TransactionTableData } from './types';
import { Button } from '@/components/ui/button';
import { Edit as EditIcon, Trash as TrashIcon } from 'lucide-react';
import { AddTransactionModal } from '@/components/AddTransactionModal';
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
import { toast } from '@/hooks/use-toast';

export const columns: ColumnDef<TransactionTableData>[] = [
  {
    accessorKey: 'transactionType',
    header: ({ column }) => (
      <TableColumnHeader
        toggleColumnSorting={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        className="text-center"
      >
        Typ transakce
      </TableColumnHeader>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue('transactionType')}
      </div>
    ),
  },
  {
    accessorKey: 'holding',
    header: ({ column }) => (
      <TableColumnHeader
        toggleColumnSorting={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        buttonClassName="pl-0"
        className="text-left"
      >
        Holding
      </TableColumnHeader>
    ),
    cell: ({ row }) => {
      const holding = row.getValue<TransactionTableData['holding']>('holding');

      return (
        <div className="flex items-center space-x-3 text-left">
          <img
            src={holding.holdingIcon}
            alt={holding.holdingSymbol}
            className="h-8 w-8 rounded-full"
          />
          <div>
            <div className="font-medium">{holding.holdingSymbol}</div>
            <div>{holding.holdingName}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: 'transactionDate',
    header: ({ column }) => (
      <TableColumnHeader
        toggleColumnSorting={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        className="text-center"
      >
        Datum
      </TableColumnHeader>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue('transactionDate')}
      </div>
    ),
  },
  {
    accessorKey: 'numberOfStocks',
    header: ({ column }) => (
      <TableColumnHeader
        toggleColumnSorting={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        className="text-center"
      >
        Počet ks
      </TableColumnHeader>
    ),
    cell: ({ row }) => (
      <div className="text-center font-medium">
        {row.getValue('numberOfStocks')}
      </div>
    ),
  },
  {
    accessorKey: 'transactionValue',
    header: ({ column }) => (
      <TableColumnHeader
        toggleColumnSorting={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        className="text-center"
      >
        Hodnota transakce
      </TableColumnHeader>
    ),
    cell: ({ row }) => {
      const transactionValue =
        row.getValue<TransactionTableData['transactionValue']>(
          'transactionValue',
        );
      return (
        <div className="flex flex-col items-center">
          <div className="font-medium">
            {Math.round(transactionValue.total)} {transactionValue.currency}
          </div>
          <div>{`${Math.round(transactionValue.perShare)} ${transactionValue.currency}/akcie`}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'transactionFee',
    header: ({ column }) => (
      <TableColumnHeader
        toggleColumnSorting={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        className="text-center"
      >
        Poplatek
      </TableColumnHeader>
    ),
    cell: ({ row }) => {
      const transactionFee =
        row.getValue<TransactionTableData['transactionFee']>('transactionFee');
      return (
        <div className="text-center font-medium">
          {transactionFee?.total} {transactionFee?.currency}
        </div>
      );
    },
  },

  {
    accessorKey: 'actions',
    header: () => (
      <TableColumnHeader className="text-center">Akce</TableColumnHeader>
    ),
    cell: ({ row }) => {
      const transactionToEdit = row.original;

      const handleDeleteTransaction = () => {
        try {
          const existingTransactions = JSON.parse(
            localStorage.getItem('transactions') || '[]',
          ) as TransactionTableData[];

          const updatedTransactions = existingTransactions.filter(
            (transaction) => transaction.id !== transactionToEdit.id,
          );

          localStorage.setItem(
            'transactions',
            JSON.stringify(updatedTransactions),
          );

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
        <div className="flex justify-center space-x-2">
          <AddTransactionModal transactionToEdit={transactionToEdit}>
            <Button variant="ghost" size="icon">
              <EditIcon className="h-4 w-4" />
            </Button>
          </AddTransactionModal>

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
        </div>
      );
    },
  },
];
