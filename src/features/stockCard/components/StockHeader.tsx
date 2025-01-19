import { CompanyProfile } from '@/components/AddTransactionForm/companyProfileSchema';
import { useStockCardData } from '@/hooks/useStockCardData';
import { HistoricalPriceData } from '@/types/historicalPrices';
import { TimeRange } from './StockCard';
import { useState } from 'react';
import FallbackLogo from '@/assets/fallback_logo.svg?react';

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
  const [hasError, setHasError] = useState(false);
  const { latestPrice, absoluteDifference, percentageDifference } =
    useStockCardData(symbol, stockPrices, selectedTimeRange);

  const isHistoricalPriceDataMissing =
    !absoluteDifference || !percentageDifference;

  const isPriceDifferenceNegative =
    (absoluteDifference ?? 0) < 0 || (percentageDifference ?? 0) < 0;

  return (
    <div className="flex flex-col items-center gap-6 py-6 md:flex-row md:justify-between">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-5">
        <div
          className="flex items-center justify-center rounded-full bg-gray-400"
          style={{ width: '7rem', height: '7rem', flexShrink: 0 }}
        >
          {companyProfile.image && !hasError ? (
            <img
              src={companyProfile.image}
              alt={companyProfile.companyName}
              className="h-14 w-14 object-cover md:h-16 md:w-16"
              onError={() => setHasError(true)}
            />
          ) : (
            <FallbackLogo className="h-14 w-14" />
          )}
        </div>

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
            <div
              className={`${
                isPriceDifferenceNegative ? 'text-red-500' : 'text-green-500'
              } flex flex-row items-center gap-2`}
            >
              <p className="text-lg font-semibold md:text-xl">
                {isPriceDifferenceNegative
                  ? `-$${Math.abs(absoluteDifference).toFixed(2)}`
                  : `+$${absoluteDifference.toFixed(2)}`}
              </p>
              <p className="text-sm md:text-base">
                {isPriceDifferenceNegative
                  ? `(${percentageDifference.toFixed(2)} %)`
                  : `(+${percentageDifference.toFixed(2)} %)`}
              </p>
            </div>
            <p className="text-sm text-gray-500 md:text-base">
              {selectedTimeRange === '7D'
                ? 'Za poslední týden'
                : selectedTimeRange === '1M'
                  ? 'Za poslední měsíc'
                  : selectedTimeRange === '1R'
                    ? 'Za poslední rok'
                    : selectedTimeRange === 'YTD'
                      ? 'Od začátku roku'
                      : 'Za posledních 5 let'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
