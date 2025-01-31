import { AddTransactionModal } from '@/components/AddTransactionModal';
import { ColumnSort, DataTable } from '@/components/DataTables/DataTable';
import { Plus as PlusIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { columns } from '../components/columns/columns';
import { useTransactionStore } from '@/stores/TransactionStore';

export const TransactionTablePage = () => {
  const defaultSorting: ColumnSort = { id: 'transactionDate', desc: true };

  const transactions = useTransactionStore((state) => state.transactions);

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
        <DataTable
          data={transactions}
          columns={columns}
          defaultSorting={defaultSorting}
        />
      </section>
    </section>
  );
};
