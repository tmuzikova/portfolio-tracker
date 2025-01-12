import { ColumnDef } from '@tanstack/react-table';
import { TableColumnHeader } from '@/components/TableColumnHeader';
import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';
import { Button } from '@/components/ui/button';
import { Edit as EditIcon } from 'lucide-react';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { DeleteButton } from './DeleteButton';
import { formatNumber } from '@/utils/formatNumber';

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
        <div className="flex items-center space-x-4 text-left">
          <div
            className="flex items-center justify-center rounded-full bg-gray-600"
            style={{ width: '4rem', height: '4rem', flexShrink: 0 }}
          >
            <img
              src={holding.holdingIcon}
              alt={holding.holdingSymbol}
              className="h-8 w-8 object-cover"
            />
          </div>
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
    cell: ({ row }) => {
      const transactionDate = row.getValue<string>('transactionDate');
      const formattedDate = new Intl.DateTimeFormat('en-GB').format(
        new Date(transactionDate),
      );
      return <div className="text-center font-medium">{formattedDate}</div>;
    },
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
        {formatNumber(row.getValue('numberOfStocks'))}
      </div>
    ),
  },
  {
    accessorKey: 'transactionValue',
    header: () => (
      <TableColumnHeader className="text-center">
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
            {formatNumber(Math.round(transactionValue.total))}{' '}
            {transactionValue.currency}
          </div>
          <div>{`${formatNumber(Math.round(transactionValue.perShare))} ${transactionValue.currency}/akcie`}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'transactionFee',
    header: () => (
      <TableColumnHeader className="text-center">Poplatek</TableColumnHeader>
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

      return (
        <div className="flex justify-center space-x-2">
          <AddTransactionModal transactionToEdit={transactionToEdit}>
            <Button variant="ghost" size="icon">
              <EditIcon className="h-4 w-4" />
            </Button>
          </AddTransactionModal>

          <DeleteButton transactionId={transactionToEdit.id} />
        </div>
      );
    },
  },
];
