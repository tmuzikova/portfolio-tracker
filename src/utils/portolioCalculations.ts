import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';
import { transactionTableDataSchema } from '@/components/AddTransactionForm/transactionTableDataSchema';
import allTransactionJSON from '@/features/transactionTable/mockData/allTransactions.json';
import { useTransactionStore } from '@/stores/TransactionStore';

const FX_RATE = 25;

const savedTransactions = allTransactionJSON
  .map((transaction) => {
    const parsedTransactions =
      transactionTableDataSchema.safeParse(transaction);
    if (parsedTransactions.success) {
      return parsedTransactions.data;
    } else {
      console.error(parsedTransactions.error);
      return null;
    }
  })
  .filter((transaction): transaction is TransactionTableData => !!transaction);

export const calculateInvestedAmount = () => {
  const existingTransactions = useTransactionStore(
    (state) => state.transactions,
  );
  const transactions = [...existingTransactions, ...savedTransactions];

  const purchaseTransactions = transactions.filter(
    (tx) => tx.transactionType === 'Nákup',
  );

  const totalInvestedAmount = purchaseTransactions.reduce((sum, tx) => {
    const totalInvestment = tx.numberOfStocks * tx.transactionValue.perShare;
    return sum + (totalInvestment + (tx.transactionFee?.total || 0)) * FX_RATE;
  }, 0);

  return totalInvestedAmount;
};

export const calculateTotalFees = () => {
  const existingTransactions = useTransactionStore(
    (state) => state.transactions,
  );
  const transactions = [...existingTransactions, ...savedTransactions];

  const totalFees = transactions.reduce((sum, tx) => {
    return sum + (tx.transactionFee?.total || 0) * FX_RATE;
  }, 0);

  return totalFees;
};
