import { CompanyProfile } from '@/components/AddTransactionForm/companyProfileSchema';
import { useStockCardData } from '@/hooks/useStockCardData/useStockCardData';
import { HistoricalPriceData } from '@/types/historicalPrices';
import { TimeRange } from './StockCard';
import { CompanyLogo } from './CompanyLogo';
import { PriceDifference } from './PriceDifference';
import { getTimeRangeLabel } from '../utils/getTimeRangeLabel';

type StockHeaderProps = {
  symbol: string;
  stockPrices: HistoricalPriceData;
  companyProfile: CompanyProfile;
  selectedTimeRange: TimeRange;
};

export function StockHeader({
  symbol,
  stockPrices,
  companyProfile,
  selectedTimeRange,
}: StockHeaderProps) {
  const { latestPrice, absoluteDifference, percentageDifference } =
    useStockCardData(symbol, stockPrices, selectedTimeRange);

  const isHistoricalPriceDataMissing =
    !absoluteDifference || !percentageDifference;

  return (
    <div className="flex flex-col items-center gap-6 py-6 md:flex-row md:justify-between">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-5">
        <CompanyLogo
          image={companyProfile.image}
          companyName={companyProfile.companyName}
        />

        <div className="text-center md:text-left">
          <h1 className="text-3xl font-semibold lg:text-4xl">{symbol}</h1>
          <h2 className="text-muted-foreground">
            {companyProfile.companyName} | {companyProfile.exchangeShortName}
          </h2>
        </div>
      </div>

      <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
        <p className="text-3xl font-semibold lg:text-4xl">
          ${latestPrice.toFixed(2)}
        </p>

        {!isHistoricalPriceDataMissing && (
          <div className="flex flex-col items-center md:items-end">
            <PriceDifference
              absoluteDifference={absoluteDifference}
              percentageDifference={percentageDifference}
            />
            <p className="text-sm text-gray-500 md:text-base">
              {getTimeRangeLabel(selectedTimeRange)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
