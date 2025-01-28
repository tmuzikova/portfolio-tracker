import { useQuery } from '@tanstack/react-query';
import { getDataFromDB } from '@/lib/stockPricesDB';
import { HistoricalPriceData } from '@/types/historicalPrices';
import {
  fetchAndSaveMissingData,
  getDateRange,
} from './useHistoricalStockPrices/useHistoricalStockPrices';

const fetchSingleSymbolHistoricalPrices = async (
  symbol: string,
  fiveYearsAgo: string,
  previousTradingDay: string,
): Promise<HistoricalPriceData> => {
  const dbData = await getDataFromDB(symbol);

  return await fetchAndSaveMissingData(
    symbol,
    dbData,
    fiveYearsAgo,
    previousTradingDay,
  );
};

export const useSingleStockHistoricalPrices = (symbol: string) => {
  const { fiveYearsAgo, previousTradingDay } = getDateRange();

  const { data, error, isLoading } = useQuery<HistoricalPriceData>({
    queryKey: ['singleStockPrice', symbol],
    queryFn: () =>
      fetchSingleSymbolHistoricalPrices(
        symbol,
        fiveYearsAgo,
        previousTradingDay,
      ),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    enabled: !!symbol,
  });

  return { symbolHistoricalStockPrices: data, isLoading, error };
};
