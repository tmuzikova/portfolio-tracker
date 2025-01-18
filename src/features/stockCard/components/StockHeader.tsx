import { CompanyProfile } from '@/components/AddTransactionForm/companyProfileSchema';
import { useStockCardData } from '@/hooks/useStockCardData';
import { HistoricalPriceData } from '@/types/historicalPrices';

type StockHeaderProps = {
  symbol: string;
  stockPrices: HistoricalPriceData;
  companyProfile: CompanyProfile;
};

export function StockHeader({
  symbol,
  stockPrices,
  companyProfile,
}: StockHeaderProps) {
  const { latestPrice, absoluteDifference, percentageDifference } =
    useStockCardData(symbol, stockPrices);

  const hasCompanyLogo = !!companyProfile.image && companyProfile.image !== '';

  const isHistoricalPriceDataMissing =
    !absoluteDifference || !percentageDifference;

  const isPriceDifferenceNegative =
    (absoluteDifference ?? 0) < 0 || (percentageDifference ?? 0) < 0;

  return (
    <div className="flex flex-row justify-between py-6">
      <div className="flex flex-row gap-5">
        <div
          className="flex items-center justify-center rounded-full bg-gray-400"
          style={{ width: '5rem', height: '5rem', flexShrink: 0 }}
        >
          {hasCompanyLogo ? (
            <img //TODO: ADD FALLBACK IMAGE and modify the logic
              src={companyProfile.image ?? undefined}
              alt={companyProfile.companyName || 'Company logo'}
              className="h-9 w-9 object-cover"
            />
          ) : (
            <div>Fallback</div>
          )}
        </div>
        <div className="flex flex-col justify-between">
          <h1 className="text-[34px] font-semibold">{symbol}</h1>
          <h2>
            {companyProfile.companyName} | {companyProfile.exchangeShortName}
          </h2>
        </div>
      </div>

      <div className="flex flex-row items-center gap-5">
        <p className="text-[34px] font-semibold">${latestPrice.toFixed(2)}</p>

        {!isHistoricalPriceDataMissing && (
          <div className={`flex flex-col items-end`}>
            <div
              className={`${
                isPriceDifferenceNegative ? 'text-red-500' : 'text-green-500'
              } flex flex-row items-center gap-2`}
            >
              <p className="text-[20px] font-semibold">
                {isPriceDifferenceNegative
                  ? `-$${Math.abs(absoluteDifference).toFixed(2)}`
                  : `+$${absoluteDifference.toFixed(2)}`}
              </p>
              <p className="text-[16px]">
                {isPriceDifferenceNegative
                  ? `(${percentageDifference.toFixed(2)} %)`
                  : `(+${percentageDifference.toFixed(2)} %)`}
              </p>
            </div>
            <p>za posledních 30 dní</p>
          </div>
        )}
      </div>
    </div>
  );
}
