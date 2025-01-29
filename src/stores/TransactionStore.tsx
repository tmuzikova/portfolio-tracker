import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';
import { showErrorToast, showSuccessToast } from '@/utils/showToast';
import { create } from 'zustand';

type TransactionStore = {
  transactions: TransactionTableData[];
  initializeTransactions: (transactions: TransactionTableData[]) => void;
  addTransaction: (transaction: TransactionTableData) => void;
  editTransaction: (updatedTransaction: TransactionTableData) => void;
  deleteTransaction: (id: string) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),

  initializeTransactions: (initialTransactions) =>
    set((state) => {
      const existingTransactions = state.transactions;

      const mergedTransactions = [
        ...existingTransactions,
        ...initialTransactions.filter(
          (newTransaction) =>
            !existingTransactions.some(
              (existingTransaction) =>
                existingTransaction.id === newTransaction.id,
            ),
        ),
      ];

      localStorage.setItem('transactions', JSON.stringify(mergedTransactions));

      return { transactions: mergedTransactions };
    }),

  addTransaction: (transaction) =>
    set((state) => {
      const newTransactions = [...state.transactions, transaction];
      localStorage.setItem('transactions', JSON.stringify(newTransactions));
      return { transactions: newTransactions };
    }),

  editTransaction: (updatedTransaction) =>
    set((state) => {
      const newTransactions = state.transactions.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction,
      );
      localStorage.setItem('transactions', JSON.stringify(newTransactions));
      return { transactions: newTransactions };
    }),

  deleteTransaction: (id) => {
    set((state) => {
      const newTransactions = state.transactions.filter(
        (transaction) => transaction.id !== id,
      );

      try {
        localStorage.setItem('transactions', JSON.stringify(newTransactions));
      } catch (error) {
        console.error('Error deleting transaction from localStorage:', error);
        showErrorToast('Nastala chyba při mazání transakce');
        return { transactions: state.transactions };
      }

      showSuccessToast('Transakce byla úspěšně smazána');
      return { transactions: newTransactions };
    });
  },
}));
