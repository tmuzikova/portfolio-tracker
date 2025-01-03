import { useQuery } from '@tanstack/react-query';
import { api } from '@/api/client';
import {
  getDataFromDB,
  saveDataToDB,
  getLatestDateFromData,
  addOneDay,
} from '@/lib/stockPricesIDB';
import { CurrentPortfolioItem } from '@/types/calculations';
import { getPreviousTradingDay } from '@/utils/portfolioCalculations/getPreviousTradingDay';
import {
  HistoricalPriceData,
  HistoricalPriceDataSchema,
} from '@/types/historicalPrices';

const fetchPriceDataForSymbol = async (
  symbol: string,
  from: string,
  to: string,
): Promise<HistoricalPriceData> => {
  try {
    const data = await api
      .get(`historical-price-full/${symbol}?from=${from}&to=${to}`)
      .json();
    const validatedData = HistoricalPriceDataSchema.parse(data);
    return validatedData;
  } catch (error) {
    console.error(
      `Error fetching historical price range for ${symbol}:`,
      error,
    );
    throw error;
  }
};

const fetchAndSaveMissingData = async (
  symbol: string,
  dbData: HistoricalPriceData | null,
  fiveYearsAgo: string,
  previousTradingDay: string,
): Promise<HistoricalPriceData> => {
  const isPriceDataNotInDb =
    !dbData || !dbData.historical || dbData.historical.length === 0;

  if (isPriceDataNotInDb) {
    const fetchedData = await fetchPriceDataForSymbol(
      symbol,
      fiveYearsAgo,
      previousTradingDay,
    );
    await saveDataToDB(symbol, fetchedData);
    return fetchedData;
  }

  const latestDateInDB = getLatestDateFromData(dbData.historical);

  if (latestDateInDB && latestDateInDB < previousTradingDay) {
    const missingFromDate = addOneDay(latestDateInDB);
    const missingData = await fetchPriceDataForSymbol(
      symbol,
      missingFromDate,
      previousTradingDay,
    );

    const mergedData: HistoricalPriceData = {
      symbol,
      historical: [...missingData.historical, ...dbData.historical].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    };

    await saveDataToDB(symbol, mergedData);
    return mergedData;
  }

  return dbData;
};

const fetchPortfolioPrices = async (
  symbols: string[],
  fiveYearsAgo: string,
  previousTradingDay: string,
): Promise<HistoricalPriceData[]> => {
  if (!symbols.length) return [];

  return await Promise.all(
    symbols.map(async (symbol) => {
      const dbData = await getDataFromDB(symbol);
      return await fetchAndSaveMissingData(
        symbol,
        dbData,
        fiveYearsAgo,
        previousTradingDay,
      );
    }),
  );
};

const getDateRange = () => {
  const previousTradingDay = getPreviousTradingDay();
  const fiveYearsAgoObj = new Date();
  fiveYearsAgoObj.setFullYear(fiveYearsAgoObj.getFullYear() - 5);
  const fiveYearsAgo = fiveYearsAgoObj.toISOString().split('T')[0];

  return { fiveYearsAgo, previousTradingDay };
};

export const useHistoricalStockPrices = (
  currentPortfolio: CurrentPortfolioItem[],
) => {
  const symbols = currentPortfolio.map((item) => item.holding.holdingSymbol);

  const { fiveYearsAgo, previousTradingDay } = getDateRange();

  const { data, error, isLoading } = useQuery<HistoricalPriceData[]>({
    queryKey: ['currentPortfolioPrices', symbols],
    queryFn: () =>
      fetchPortfolioPrices(symbols, fiveYearsAgo, previousTradingDay),
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    enabled: symbols.length > 0,
  });

  return { data, isLoading, error };
};
