import { HistoricalPriceData } from '@/types/historicalPrices';
import { StockPriceDevelopmentChart } from './StockPriceDevelopmentChart';
import { CompanyProfile } from '@/components/AddTransactionForm/companyProfileSchema';
import { StockHeader } from './StockHeader';
import { StockInfo } from './StockInfo';
import { useState } from 'react';

type StockCardProps = {
  symbol: string;
  stockPrices: HistoricalPriceData;
  companyProfile: CompanyProfile;
};

export type TimeRange = '5R' | '1R' | 'YTD' | '1M' | '7D';

export const StockCard = ({
  symbol,
  stockPrices,
  companyProfile,
}: StockCardProps) => {
  const [selectedTimeRange, setSelectedTimeRange] = useState<TimeRange>('1M');

  return (
    <section className="container mx-auto flex flex-col gap-6 px-4 pb-12">
      <section>
        <StockHeader
          symbol={symbol}
          stockPrices={stockPrices}
          companyProfile={companyProfile}
          selectedTimeRange={selectedTimeRange}
        />
      </section>

      <section>
        <StockPriceDevelopmentChart
          stockPrices={stockPrices}
          selectedTimeRange={selectedTimeRange}
          onTimeRangeChange={setSelectedTimeRange}
        />
      </section>

      <section>
        <StockInfo companyProfile={companyProfile} />
      </section>
    </section>
  );
};
