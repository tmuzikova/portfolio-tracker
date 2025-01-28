import { useParams } from 'react-router-dom';
import { StockCard } from '../components/StockCard';
import { useSingleStockHistoricalPrices } from '@/hooks/useSingleStockHistoricalPrices';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { ErrorPage } from '@/components/ErrorPage';
import { LoadingState } from '@/components/LoadingState';

export const StockCardPage = () => {
  const { symbol } = useParams<{ symbol: string }>();

  if (!symbol) {
    return <ErrorPage />;
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
    return <LoadingState />;
  }

  if (
    priceDataError ||
    companyProfileError ||
    !stockPrices ||
    !companyProfile
  ) {
    return <ErrorPage />;
  }

  return (
    <StockCard
      symbol={symbol}
      stockPrices={stockPrices}
      companyProfile={companyProfile}
    />
  );
};
