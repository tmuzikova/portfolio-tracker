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
    <div className="flex flex-col items-center gap-6 py-6 md:flex-row md:justify-between">
      <div className="flex flex-col items-center gap-4 md:flex-row md:gap-5">
        <div
          className="flex items-center justify-center rounded-full bg-gray-400"
          style={{ width: '7rem', height: '7rem', flexShrink: 0 }}
        >
          {hasCompanyLogo ? (
            <img
              src={companyProfile.image ?? undefined}
              alt={companyProfile.companyName}
              className="h-14 w-14 object-cover md:h-16 md:w-16"
            />
          ) : (
            <div className="text-sm text-muted-foreground">Fallback</div>
          )}
        </div>

        <div className="text-center md:text-left">
          <h1 className="text-3xl font-semibold lg:text-4xl">{symbol}</h1>
          <h2 className="text-muted-foreground">
            {companyProfile.companyName} | {companyProfile.exchangeShortName}
          </h2>
        </div>
      </div>

      <div className="flex flex-row items-center gap-2 md:gap-4">
        <p className="text-3xl font-semibold lg:text-4xl">
          ${latestPrice.toFixed(2)}
        </p>

        {!isHistoricalPriceDataMissing && (
          <div className="flex flex-col items-start md:items-end">
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
              za posledních 30 dní
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
