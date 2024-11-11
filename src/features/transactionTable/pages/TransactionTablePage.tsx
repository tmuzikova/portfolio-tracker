import { AddTransactionButton } from '@/components/AddTransactionButton';
import { TransactionTable } from '../components/TransactionTable';
import { columns, TransactionTableData } from '../components/columns';

export const TransactionTablePage = () => {
  const stockTableData: TransactionTableData[] = [
    {
      transactionType: 'Buy',
      holding: {
        holdingIcon: 'https://logo.clearbit.com/apple.com',
        holdingSymbol: 'AAPL',
        holdingName: 'Apple Inc.',
      },
      transactionDate: '2024-10-01',
      numberOfStocks: 15,
      transactionValue: {
        total: 1500,
        perShare: 100,
        currency: 'USD',
      },
      transactionFee: {
        total: 5,
        currency: 'USD',
      },
    },
    {
      transactionType: 'Buy',
      holding: {
        holdingIcon: 'https://logo.clearbit.com/microsoft.com',
        holdingSymbol: 'MSFT',
        holdingName: 'Microsoft Corporation',
      },
      transactionDate: '2024-10-02',
      numberOfStocks: 10,
      transactionValue: {
        total: 2800,
        perShare: 280,
        currency: 'USD',
      },
      transactionFee: {
        total: 7,
        currency: 'USD',
      },
    },
    {
      transactionType: 'Sell',
      holding: {
        holdingIcon: 'https://logo.clearbit.com/google.com',
        holdingSymbol: 'GOOGL',
        holdingName: 'Alphabet Inc.',
      },
      transactionDate: '2024-10-03',
      numberOfStocks: 8,
      transactionValue: {
        total: 2200,
        perShare: 275,
        currency: 'USD',
      },
      transactionFee: {
        total: 10,
        currency: 'USD',
      },
    },
    {
      transactionType: 'Buy',
      holding: {
        holdingIcon: 'https://logo.clearbit.com/amazon.com',
        holdingSymbol: 'AMZN',
        holdingName: 'Amazon.com, Inc.',
      },
      transactionDate: '2024-10-04',
      numberOfStocks: 5,
      transactionValue: {
        total: 1650,
        perShare: 330,
        currency: 'USD',
      },
      transactionFee: {
        total: 6,
        currency: 'USD',
      },
    },
    {
      transactionType: 'Sell',
      holding: {
        holdingIcon: 'https://logo.clearbit.com/tesla.com',
        holdingSymbol: 'TSLA',
        holdingName: 'Tesla, Inc.',
      },
      transactionDate: '2024-10-05',
      numberOfStocks: 20,
      transactionValue: {
        total: 1400,
        perShare: 70,
        currency: 'USD',
      },
      transactionFee: {
        total: 8,
        currency: 'USD',
      },
    },
    {
      transactionType: 'Buy',
      holding: {
        holdingIcon: 'https://logo.clearbit.com/nvidia.com',
        holdingSymbol: 'NVDA',
        holdingName: 'NVIDIA Corporation',
      },
      transactionDate: '2024-10-06',
      numberOfStocks: 12,
      transactionValue: {
        total: 600,
        perShare: 50,
        currency: 'USD',
      },
      transactionFee: {
        total: 4,
        currency: 'USD',
      },
    },
    {
      transactionType: 'Sell',
      holding: {
        holdingIcon: 'https://logo.clearbit.com/coca-cola.com',
        holdingSymbol: 'KO',
        holdingName: 'The Coca-Cola Company',
      },
      transactionDate: '2024-10-07',
      numberOfStocks: 30,
      transactionValue: {
        total: 480,
        perShare: 16,
        currency: 'USD',
      },
      transactionFee: {
        total: 3,
        currency: 'USD',
      },
    },
    {
      transactionType: 'Buy',
      holding: {
        holdingIcon: 'https://logo.clearbit.com/jnj.com',
        holdingSymbol: 'JNJ',
        holdingName: 'Johnson & Johnson',
      },
      transactionDate: '2024-10-08',
      numberOfStocks: 20,
      transactionValue: {
        total: 1800,
        perShare: 90,
        currency: 'USD',
      },
      transactionFee: {
        total: 6,
        currency: 'USD',
      },
    },
  ];

  return (
    <section className="container mx-auto px-4 pb-12">
      <header className="flex flex-row justify-between py-6">
        <h1 className="text-[34px] font-semibold">Transakce</h1>
        <AddTransactionButton />
      </header>

      <section>
        <TransactionTable data={stockTableData} columns={columns} />
      </section>
    </section>
  );
};
