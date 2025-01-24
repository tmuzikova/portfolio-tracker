import { api } from '@/api/client';
import { getDataFromDB, saveDataToDB } from '@/lib/historicalDividendsIDB';
import { useTransactionStore } from '@/stores/TransactionStore';
import {
  HistoricalDividendData,
  historicalDividendDataSchema,
  HistoricalDividendDataWithLastUpdated,
} from '@/types/historicalDividends';
import { getSavedTransactions } from '@/utils/getSavedTransactions';
import { getUniqueHistoricalSymbols } from '@/utils/getUniqueHistoricalSymbols';
import { isDividendDataStale } from '@/utils/isDividendDataStale';
import { useQuery } from '@tanstack/react-query';

const fetchHistoricalDividendsForSymbol = async (
  symbol: string,
): Promise<HistoricalDividendData> => {
  try {
    const response = await api
      .get(`historical-price-full/stock_dividend/${symbol}`)
      .json();
    return historicalDividendDataSchema.parse(response);
  } catch (error) {
    console.error(`Error fetching historical dividends for ${symbol}:`, error);
    throw error;
  }
};

const fetchAndUpdateDividends = async (
  symbol: string,
  dbData: HistoricalDividendDataWithLastUpdated | null,
): Promise<HistoricalDividendDataWithLastUpdated> => {
  if (!isDividendDataStale(dbData)) return dbData!;

  const fetchedData = await fetchHistoricalDividendsForSymbol(symbol);
  const dataToSave: HistoricalDividendDataWithLastUpdated = {
    ...fetchedData,
    lastUpdated: new Date().toISOString(),
    hasDividends: fetchedData.historical.length > 0,
  };
  await saveDataToDB(symbol, dataToSave);
  return dataToSave;
};

const fetchPortfolioDividends = async (
  symbols: string[],
): Promise<HistoricalDividendDataWithLastUpdated[]> => {
  if (!symbols.length) return [];

  return Promise.all(
    symbols.map(async (symbol) => {
      const dbData = await getDataFromDB(symbol);
      return await fetchAndUpdateDividends(symbol, dbData);
    }),
  );
};

export const useHistoricalDividends = () => {
  const existingTransactions = useTransactionStore(
    (state) => state.transactions,
  );
  const savedTransactions = getSavedTransactions();

  const symbols = getUniqueHistoricalSymbols({
    existingTransactions,
    savedTransactions,
  });

  const { data, isLoading, error } = useQuery<
    HistoricalDividendDataWithLastUpdated[]
  >({
    queryKey: ['historicalDividends', symbols],
    queryFn: () => fetchPortfolioDividends(symbols),
    staleTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    gcTime: 1000 * 60 * 60 * 24 * 7, // 7 days
    enabled: symbols.length > 0,
  });

  return {
    data,
    isLoading,
    error,
  };
};
