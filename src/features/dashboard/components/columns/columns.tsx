import { ColumnDef } from '@tanstack/react-table';
import { TableColumnHeader } from '@/components/DataTables/TableColumnHeader';
import { StockTableData } from './types';
import { HoldingCell } from '@/components/DataTables/HoldingCell';

export const columns: ColumnDef<StockTableData>[] = [
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
      const holding = row.getValue<StockTableData['holding']>('holding');
      return <HoldingCell holding={holding} />;
    },
  },
  {
    accessorKey: 'stocksPurchased',
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
        {row.getValue('stocksPurchased')}
      </div>
    ),
  },
  {
    accessorKey: 'purchaseValue',
    header: ({ column }) => (
      <TableColumnHeader
        toggleColumnSorting={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        className="text-center"
      >
        Kupní hodnota
      </TableColumnHeader>
    ),
    cell: ({ row }) => {
      const purchaseValue =
        row.getValue<StockTableData['purchaseValue']>('purchaseValue');
      return (
        <div className="flex flex-col items-center">
          <div className="font-medium">{`${Math.round(purchaseValue.total)} CZK`}</div>
          <div>{`${Math.round(purchaseValue.perShare)} CZK/akcie`}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'currentValue',
    header: ({ column }) => (
      <TableColumnHeader
        toggleColumnSorting={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        className="text-center"
      >
        Současná hodnota
      </TableColumnHeader>
    ),
    cell: ({ row }) => {
      const currentValue =
        row.getValue<StockTableData['currentValue']>('currentValue');
      return (
        <div className="text-center">
          <div className="font-medium">{`${Math.round(currentValue.total)} CZK`}</div>
          <div>{`${Math.round(currentValue.perShare)} CZK/akcie`}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'profit',
    header: ({ column }) => (
      <TableColumnHeader
        toggleColumnSorting={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        className="text-center"
      >
        Zisk
      </TableColumnHeader>
    ),
    cell: ({ row }) => {
      const profit = row.getValue<StockTableData['profit']>('profit');
      const profitColor =
        profit.absolute >= 0 ? 'text-green-500' : 'text-red-500';
      return (
        <div className={`text-center ${profitColor}`}>
          <div className="font-medium">{`${Math.round(profit.absolute)} CZK`}</div>
          <div>{`${profit.percentage.toFixed(2)} %`}</div>
        </div>
      );
    },
  },
  {
    accessorKey: 'portfolioShare',
    header: ({ column }) => (
      <TableColumnHeader
        toggleColumnSorting={() =>
          column.toggleSorting(column.getIsSorted() === 'asc')
        }
        className="text-center"
      >
        Podíl v portfoliu
      </TableColumnHeader>
    ),
    cell: ({ row }) => {
      const portfolioShare = parseFloat(row.getValue('portfolioShare'));
      const formatted = `${portfolioShare.toFixed(2)} %`;
      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
];
