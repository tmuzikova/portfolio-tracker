import { useParams } from 'react-router-dom';
import { AlertTriangle, Loader as LoaderIcon } from 'lucide-react';
import { StockCard } from '../components/StockCard';
import { useSingleStockHistoricalPrices } from '@/hooks/useSingleStockHistoricalPrices';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';

export const StockCardPage = () => {
  const { symbol } = useParams<{ symbol: string }>();

  if (!symbol) {
    return <div>Chyba: chybějící symbol</div>;
  }

  const {
    symbolHistoricalStockPrices: stockPrices,
    isLoading: isPriceDataLoading,
    error: priceDataError,
  } = useSingleStockHistoricalPrices(symbol);
  const {
    companyProfile,
    isLoading: isCompanyProfileLoading,
    error: companyProfileError,
  } = useCompanyProfile(symbol);

  const isLoading = isPriceDataLoading || isCompanyProfileLoading;
  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (
    priceDataError ||
    companyProfileError ||
    !stockPrices ||
    !companyProfile
  ) {
    return (
      <div className="flex h-64 w-full items-center justify-center text-red-500">
        <AlertTriangle className="mr-2 h-5 w-5" />
        Chyba při načítání dat
      </div>
    );
  }

  return (
    <StockCard
      symbol={symbol}
      stockPrices={stockPrices}
      companyProfile={companyProfile}
    />
  );
};
