import { ColumnDef } from '@tanstack/react-table';
import { TableColumnHeader } from '@/components/DataTables/TableColumnHeader';
import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';
import { Button } from '@/components/ui/button';
import { Edit as EditIcon } from 'lucide-react';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { DeleteButton } from './DeleteButton';
import { formatNumber } from '@/utils/formatNumber';
import { HoldingCell } from '@/components/DataTables/HoldingCell';

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
    sortingFn: (rowA, rowB) => {
      const a =
        rowA.getValue<TransactionTableData['transactionType']>(
          'transactionType',
        );
      const b =
        rowB.getValue<TransactionTableData['transactionType']>(
          'transactionType',
        );
      return a.localeCompare(b);
    },
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

      return <HoldingCell holding={holding} />;
    },
    sortingFn: (rowA, rowB) => {
      const a =
        rowA.getValue<TransactionTableData['holding']>('holding').holdingSymbol;
      const b =
        rowB.getValue<TransactionTableData['holding']>('holding').holdingSymbol;
      return a.localeCompare(b);
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
    sortingFn: (rowA, rowB) => {
      const a = new Date(rowA.getValue('transactionDate')).getTime();
      const b = new Date(rowB.getValue('transactionDate')).getTime();
      return a - b;
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
    sortingFn: (rowA, rowB) => {
      const a = rowA.getValue<number>('numberOfStocks');
      const b = rowB.getValue<number>('numberOfStocks');
      return a - b;
    },
  },
  {
    accessorKey: 'transactionValue',
    header: ({ column }) => (
      <TableColumnHeader
        className="text-center"
        toggleColumnSorting={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
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
            {formatNumber(Math.round(transactionValue.total))}{' '}
            {transactionValue.currency}
          </div>
          <div>{`${formatNumber(Math.round(transactionValue.perShare))} ${transactionValue.currency}/akcie`}</div>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a =
        rowA.getValue<TransactionTableData['transactionValue']>(
          'transactionValue',
        ).total;
      const b =
        rowB.getValue<TransactionTableData['transactionValue']>(
          'transactionValue',
        ).total;
      return a - b;
    },
  },
  {
    accessorKey: 'transactionFee',
    header: ({ column }) => (
      <TableColumnHeader
        className="text-center"
        toggleColumnSorting={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
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
    sortingFn: (rowA, rowB) => {
      const aFee =
        rowA.getValue<TransactionTableData['transactionFee']>('transactionFee')
          ?.total || 0;
      const bFee =
        rowB.getValue<TransactionTableData['transactionFee']>('transactionFee')
          ?.total || 0;
      return aFee - bFee;
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
