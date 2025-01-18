import { HistoricalPriceData } from '@/types/historicalPrices';
import { StockPriceDevelopmentChart } from './StockPriceDevelopmentChart';
import { CompanyProfile } from '@/components/AddTransactionForm/companyProfileSchema';
import { StockHeader } from './StockHeader';

type StockCardProps = {
  symbol: string;
  stockPrices: HistoricalPriceData;
  companyProfile: CompanyProfile;
};

export const StockCard = ({
  symbol,
  stockPrices,
  companyProfile,
}: StockCardProps) => {
  return (
    <section className="container mx-auto px-4 pb-12">
      <section>
        <StockHeader
          symbol={symbol}
          stockPrices={stockPrices}
          companyProfile={companyProfile}
        />
      </section>

      <section>
        <StockPriceDevelopmentChart />
      </section>
    </section>
  );
};
