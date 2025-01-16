import { ColumnDef } from '@tanstack/react-table';
import { TableColumnHeader } from '@/components/TableColumnHeader';
import { CurrentPortfolioItemWithPriceData } from '@/types/currentPortfolio';
import { formatNumber } from '@/utils/formatNumber';
import { Link } from 'react-router-dom';

export const columns: ColumnDef<CurrentPortfolioItemWithPriceData>[] = [
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
      const holding =
        row.getValue<CurrentPortfolioItemWithPriceData['holding']>('holding');
      return (
        <div className="flex items-center space-x-4 text-left">
          <div
            className="flex items-center justify-center rounded-full bg-gray-600"
            style={{ width: '4rem', height: '4rem', flexShrink: 0 }}
          >
            <Link to={`/detail/${holding.holdingSymbol}`}>
              <img
                src={holding.holdingIcon}
                alt={holding.holdingSymbol}
                className="h-8 w-8 object-cover"
              />
            </Link>
          </div>
          <div>
            <div className="font-medium hover:underline">
              <Link to={`/detail/${holding.holdingSymbol}`}>
                {holding.holdingSymbol}
              </Link>
            </div>
            <div className="hover:underline">
              <Link to={`/detail/${holding.holdingSymbol}`}>
                {holding.holdingName}
              </Link>
            </div>
          </div>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a =
        rowA.getValue<CurrentPortfolioItemWithPriceData['holding']>(
          'holding',
        ).holdingSymbol;
      const b =
        rowB.getValue<CurrentPortfolioItemWithPriceData['holding']>(
          'holding',
        ).holdingSymbol;
      return a.localeCompare(b);
    },
  },
  {
    accessorKey: 'totalNumberOfStocks',
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
        {row.getValue('totalNumberOfStocks')}
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
        row.getValue<CurrentPortfolioItemWithPriceData['purchaseValue']>(
          'purchaseValue',
        );
      return (
        <div className="flex flex-col items-center">
          <div className="font-medium">{`${formatNumber(Math.round(purchaseValue.total))} CZK`}</div>
          <div>{`${formatNumber(Math.round(purchaseValue.avgPricePerShare))} CZK/akcie`}</div>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a =
        rowA.getValue<CurrentPortfolioItemWithPriceData['purchaseValue']>(
          'purchaseValue',
        ).total;
      const b =
        rowB.getValue<CurrentPortfolioItemWithPriceData['purchaseValue']>(
          'purchaseValue',
        ).total;
      return a - b;
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
        row.getValue<CurrentPortfolioItemWithPriceData['currentValue']>(
          'currentValue',
        );
      return (
        <div className="text-center">
          <div className="font-medium">{`${formatNumber(Math.round(currentValue.total))} CZK`}</div>
          <div>{`${formatNumber(Math.round(currentValue.pricePerShare))} CZK/akcie`}</div>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a =
        rowA.getValue<CurrentPortfolioItemWithPriceData['currentValue']>(
          'currentValue',
        ).total;
      const b =
        rowB.getValue<CurrentPortfolioItemWithPriceData['currentValue']>(
          'currentValue',
        ).total;
      return a - b;
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
      const profit =
        row.getValue<CurrentPortfolioItemWithPriceData['profit']>('profit');
      const profitPercentage = profit.percentage.toFixed(2);
      const profitColor =
        profit.absolute >= 0 ? 'text-green-500' : 'text-red-500';
      return (
        <div className={`text-center ${profitColor}`}>
          <div className="font-medium">{`${formatNumber(Math.round(profit.absolute))} CZK`}</div>
          <div>{`${formatNumber(parseFloat(profitPercentage), 2)} %`}</div>
        </div>
      );
    },
    sortingFn: (rowA, rowB) => {
      const a =
        rowA.getValue<CurrentPortfolioItemWithPriceData['profit']>(
          'profit',
        ).absolute;
      const b =
        rowB.getValue<CurrentPortfolioItemWithPriceData['profit']>(
          'profit',
        ).absolute;
      return a - b;
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
    sortingFn: (rowA, rowB) => {
      const a = parseFloat(rowA.getValue('portfolioShare'));
      const b = parseFloat(rowB.getValue('portfolioShare'));
      return a - b;
    },
  },
];
