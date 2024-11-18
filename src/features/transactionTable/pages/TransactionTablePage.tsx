import { AddTransactionButton } from '@/components/AddTransactionButton';
import { columns } from '../components/columns/columns';
import { DataTable } from '@/components/DataTable';
import { transactionTableData } from '../mockData/transactionTableData';

export const TransactionTablePage = () => {
  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="flex flex-row justify-between py-6">
        <h1 className="text-[34px] font-semibold">Transakce</h1>
        <AddTransactionButton />
      </div>

      <section>
        <DataTable data={transactionTableData} columns={columns} />
      </section>
    </section>
  );
};
