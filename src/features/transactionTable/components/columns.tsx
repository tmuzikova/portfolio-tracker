import { ColumnDef } from '@tanstack/react-table';
import { TableColumnHeader } from '@/components/TableColumnHeader';

export type TransactionTableData = {
  transactionType: string;
  holding: {
    holdingIcon: string;
    holdingSymbol: string;
    holdingName: string;
  };
  transactionDate: string;
  numberOfStocks: number;
  transactionValue: {
    total: number;
    perShare: number;
    currency: string;
  };
  transactionFee?: {
    total: number;
    currency: string;
  };
};

export const columns: ColumnDef<TransactionTableData>[] = [
  {
    accessorKey: 'transactionType',
    header: ({ column }) => {
      return (
        <TableColumnHeader
          column={column}
          title="Typ transakce"
          wrapperClassName="text-center"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('transactionType')}
        </div>
      );
    },
  },
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
    header: ({ column }) => {
      return (
        <TableColumnHeader
          column={column}
          title="Datum"
          wrapperClassName="text-center"
        />
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-center font-medium">
          {row.getValue('transactionDate')}
        </div>
      );
    },
  },

  {
    accessorKey: 'numberOfStocks',
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
          {row.getValue('numberOfStocks')}
        </div>
      );
    },
  },

  {
    accessorKey: 'transactionValue',
    header: ({ column }) => (
      <TableColumnHeader
        column={column}
        title="Hodnota transakce"
        wrapperClassName="text-center"
      />
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
    header: ({ column }) => {
      return (
        <TableColumnHeader
          column={column}
          title="Poplatek"
          wrapperClassName="text-center"
        />
      );
    },
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
];
