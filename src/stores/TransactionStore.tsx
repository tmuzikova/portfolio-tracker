import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';
import { showErrorToast, showSuccessToast } from '@/utils/showToast';
import { create } from 'zustand';

type TransactionStore = {
  transactions: TransactionTableData[];
  addTransaction: (transaction: TransactionTableData) => void;
  editTransaction: (updatedTransaction: TransactionTableData) => void;
  deleteTransaction: (id: string) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: JSON.parse(localStorage.getItem('transactions') || '[]'),

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
    try {
      set((state) => {
        const newTransactions = state.transactions.filter(
          (transaction) => transaction.id !== id,
        );
        localStorage.setItem('transactions', JSON.stringify(newTransactions));
        return { transactions: newTransactions };
      });
      showSuccessToast('Transakce byla úspěšně smazána');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      showErrorToast('Nastala chyba při mazání transakce');
    }
  },
}));