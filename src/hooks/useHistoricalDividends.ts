import { api } from '@/api/client';
import { getDataFromDB, saveDataToDB } from '@/lib/historicalDividendsIDB';
import { useTransactionStore } from '@/stores/TransactionStore';
import {
  HistoricalDividendData,
  historicalDividendDataSchema,
  HistoricalDividendDataWithLastUpdated,
} from '@/types/historicalDividends';
import { getLastTuesday } from '@/utils/getLastTuesday';
import { getSavedTransactions } from '@/utils/getSavedTransactions';
import { getUniqueHistoricalSymbols } from '@/utils/getUniqueHistoricalSymbols';
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

const fetchAndSaveData = async (
  symbol: string,
  dbData: HistoricalDividendDataWithLastUpdated | null,
): Promise<HistoricalDividendDataWithLastUpdated> => {
  const lastTuesday = new Date(getLastTuesday());
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const isDividendDataMissing = !dbData || !dbData.lastUpdated;
  const isStaleNonDividendData =
    dbData?.hasDividends === false &&
    dbData.lastUpdated &&
    new Date(dbData.lastUpdated) < sixMonthsAgo;
  const isStaleDividendData =
    dbData?.lastUpdated && new Date(dbData.lastUpdated) < lastTuesday;

  const needsUpdate =
    isDividendDataMissing || isStaleNonDividendData || isStaleDividendData;

  if (needsUpdate) {
    const fetchedData = await fetchHistoricalDividendsForSymbol(symbol);

    const dataToSave: HistoricalDividendDataWithLastUpdated = {
      ...fetchedData,
      lastUpdated: new Date().toISOString(),
      hasDividends: fetchedData.historical.length > 0,
    };

    await saveDataToDB(symbol, dataToSave);
    return dataToSave;
  }

  return dbData;
};

const fetchPortfolioDividends = async (
  symbols: string[],
): Promise<HistoricalDividendDataWithLastUpdated[]> => {
  if (!symbols.length) return [];

  return Promise.all(
    symbols.map(async (symbol) => {
      const dbData = await getDataFromDB(symbol);
      return await fetchAndSaveData(symbol, dbData);
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
