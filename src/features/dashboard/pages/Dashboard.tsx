import { AddTransactionModal } from '@/components/AddTransactionModal';
import { StatCards } from '../components/StatCards';
import { PortfolioHistoryChart } from '../components/PortfolioHistoryChart';
import { DiversificationCharts } from '../components/DiversificationCharts';
import { columns } from '../components/columns/columns';
import { DataTable } from '@/components/DataTable';
import { Button } from '@/components/ui/button';
import { Plus as PlusIcon } from 'lucide-react';
import { stockTableData } from '../mockData/stockTableData';

export const Dashboard = () => {
  return (
    <section className="container mx-auto px-4 pb-12">
      <div className="flex flex-row justify-between py-6">
        <h1 className="text-[34px] font-semibold">Přehled</h1>
        <AddTransactionModal>
          <Button className="!h-[48px] !w-[48px]">
            <span>
              <PlusIcon className="!h-6 !w-6" />
            </span>
          </Button>
        </AddTransactionModal>
      </div>

      <div className="flex flex-col gap-12">
        <section className="flex gap-5">
          <StatCards />
        </section>

        <section>
          <PortfolioHistoryChart />
        </section>

        <section>
          <DiversificationCharts />
        </section>

        <section className="w-full">
          <DataTable
            data={stockTableData}
            columns={columns}
            headerTitle="Výkon jednotlivých aktiv"
          />
        </section>
      </div>
    </section>
  );
};
