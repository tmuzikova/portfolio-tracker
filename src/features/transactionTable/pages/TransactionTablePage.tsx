import { AddTransactionModal } from '@/components/AddTransactionModal';
import { DataTable } from '@/components/DataTable';
import { Plus as PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { columns } from '../components/columns/columns';
import allTransactionJSON from '@/features/transactionTable/mockData/allTransactions.json';
import { TransactionTableData } from '@/features/transactionTable/components/columns/types';

export const TransactionTablePage = () => {
  const savedTransactions: TransactionTableData[] = allTransactionJSON;
  const existingTransactions = JSON.parse(
    localStorage.getItem('transactions') || '[]',
  ) as TransactionTableData[];

  const transactions = [...existingTransactions, ...savedTransactions];
  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="flex flex-row justify-between py-6">
        <h1 className="text-[34px] font-semibold">Transakce</h1>
        <AddTransactionModal>
          <Button className="!h-[48px] !w-[48px]">
            <span>
              <PlusIcon className="!h-6 !w-6" />
            </span>
          </Button>
        </AddTransactionModal>
      </div>

      <section>
        <DataTable data={transactions} columns={columns} />
      </section>
    </section>
  );
};
