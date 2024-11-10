import { ColumnDef } from '@tanstack/react-table';
import { TableColumnHeader } from '@/components/TableColumnHeader';

export type StockTableData = {
  holding: {
    holdingIcon: string;
    holdingSymbol: string;
    holdingName: string;
  };
  stocksPurchased: number;
  purchaseValue: {
    total: number;
    perShare: number;
  };
  currentValue: {
    total: number;
    perShare: number;
  };
  profit: {
    absolute: number;
    percentage: number;
  };
  portfolioShare: number;
};

export const columns: ColumnDef<StockTableData>[] = [
  {
    accessorKey: 'holding',
    header: ({ column }) => {
      return (
        <TableColumnHeader
          column={column}
          title="Holding"
          buttonClassName="pl-0"
          wrapperClassName="text-left"
        />
      );
    },
    cell: ({ row }) => {
      const holding = row.getValue<StockTableData['holding']>('holding');

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
    accessorKey: 'stocksPurchased',
    header: ({ column }) => {
      return (
        <TableColumnHeader
          column={column}
          title="Počet ks"
          wrapperClassName="text-center"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('stocksPurchased')}
        </div>
      );
    },
  },

  {
    accessorKey: 'purchaseValue',
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Kupní hodnota"
        wrapperClassName="text-center"
      />
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
        column={column}
        title="Současná hodnota"
        wrapperClassName="text-center"
      />
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
        column={column}
        title="Zisk"
        wrapperClassName="text-center"
      />
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
    header: ({ column }) => {
      return (
        <TableColumnHeader
          column={column}
          title="Podíl v portfoliu"
          wrapperClassName="text-center"
        />
      );
    },
    cell: ({ row }) => {
      const portfolioShare = parseFloat(row.getValue('portfolioShare'));
      const formatted = `${portfolioShare.toFixed(2)} %`;

      return <div className="text-center font-medium">{formatted}</div>;
    },
  },
];
