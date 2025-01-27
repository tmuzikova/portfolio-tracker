import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';
import { supabase } from '@/lib/supabaseClient';
import { showErrorToast, showSuccessToast } from '@/utils/showToast';
import { create } from 'zustand';

type TransactionStore = {
  transactions: TransactionTableData[];
  isLoading: boolean;
  fetchTransactions: () => void;
  addTransaction: (transaction: TransactionTableData) => void;
  editTransaction: (updatedTransaction: TransactionTableData) => void;
  deleteTransaction: (id: string) => void;
};

export const useTransactionStore = create<TransactionStore>((set) => ({
  transactions: [],
  isLoading: false,

  fetchTransactions: async () => {
    try {
      set({ isLoading: true });
      const { data, error } = await supabase
        .from('transactions')
        .select('*')
        .order('transactionDate', { ascending: false });

      if (error) throw error;

      set({ transactions: data || [] });
    } catch (error) {
      console.error('Error fetching transactions:', error);
      showErrorToast('Nastala chyba při načítání transakcí');
    } finally {
      set({ isLoading: false });
    }
  },

  addTransaction: async (transaction) => {
    set({ isLoading: true });
    const { error } = await supabase.from('transactions').insert(transaction);

    if (error) throw error;

    useTransactionStore.getState().fetchTransactions();
    set({ isLoading: false });
  },

  editTransaction: async (updatedTransaction) => {
    set({ isLoading: true });
    const { error } = await supabase
      .from('transactions')
      .update(updatedTransaction)
      .eq('id', updatedTransaction.id);

    if (error) throw error;

    useTransactionStore.getState().fetchTransactions();
    set({ isLoading: false });
  },

  deleteTransaction: async (id) => {
    try {
      set({ isLoading: true });
      const { error } = await supabase
        .from('transactions')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        transactions: state.transactions.filter(
          (transaction) => transaction.id !== id,
        ),
      }));

      showSuccessToast('Transakce byla úspěšně smazána');
    } catch (error) {
      console.error('Error deleting transaction:', error);
      showErrorToast('Nastala chyba při mazání transakce');
      throw error;
    } finally {
      set({ isLoading: false });
    }
  },
}));
