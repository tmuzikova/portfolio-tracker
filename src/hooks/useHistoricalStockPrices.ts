import { useQuery } from '@tanstack/react-query';
import { api } from '../api/client';
import {
  getDataFromDB,
  saveDataToDB,
  getLatestDateFromData,
  addOneDay,
} from '../lib/stockPricesIDB';
import { CurrentPortfolioItem } from '../types/calculations';
import { z } from 'zod';

export const HistoricalPriceEntrySchema = z.object({
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: 'Invalid date format, must be YYYY-MM-DD',
  }),
  open: z.number().nonnegative('Open must be a non-negative number'),
  high: z.number().nonnegative('High must be a non-negative number'),
  low: z.number().nonnegative('Low must be a non-negative number'),
  close: z.number().nonnegative('Close must be a non-negative number'),
  adjClose: z
    .number()
    .nonnegative('Adjusted close must be a non-negative number'),
  volume: z.number().int().nonnegative('Volume must be a non-negative integer'),
  unadjustedVolume: z
    .number()
    .int()
    .nonnegative('Unadjusted volume must be a non-negative integer'),
  change: z.number(),
  changePercent: z.number(),
  vwap: z.number().nonnegative('VWAP must be a non-negative number'),
  label: z.string().min(1, 'Label must not be empty'),
  changeOverTime: z.number(),
});

export const HistoricalPriceDataSchema = z.object({
  symbol: z.string().min(1, 'Symbol must not be empty'),
  historical: z.array(HistoricalPriceEntrySchema),
});

export type HistoricalPriceData = z.infer<typeof HistoricalPriceDataSchema>;
export type HistoricalPriceEntry = z.infer<typeof HistoricalPriceEntrySchema>;

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

const getPreviousTradingDay = () => {
  const date = new Date();
  const dayOfWeek = date.getDay();
  if (dayOfWeek === 0)
    date.setDate(date.getDate() - 2); // Sunday => Friday
  else if (dayOfWeek === 6)
    date.setDate(date.getDate() - 1); // Saturday => Friday
  else date.setDate(date.getDate() - 1); // regular weekday => Previous day
  return date.toISOString().split('T')[0];
};

export const useHistoricalStockPrices = (
  currentPortfolio: CurrentPortfolioItem[],
) => {
  const symbols = currentPortfolio.map((item) => item.holding.holdingSymbol);

  const yesterdayDate = getPreviousTradingDay();
  const date = new Date();
  date.setFullYear(date.getFullYear() - 5);
  const fiveYearsAgo = date.toISOString().split('T')[0];

  const { data, error, isLoading } = useQuery<HistoricalPriceData[]>({
    queryKey: ['currentPortfolioPrices', symbols],
    queryFn: async () => {
      if (!symbols.length) {
        return [];
      }

      try {
        const results = await Promise.all(
          symbols.map(async (symbol) => {
            const dbData = await getDataFromDB(symbol);

            if (
              !dbData ||
              !dbData.historical ||
              dbData.historical.length === 0
            ) {
              const fetchedData = await fetchPriceDataForSymbol(
                symbol,
                fiveYearsAgo,
                yesterdayDate,
              );
              await saveDataToDB(symbol, fetchedData);
              return fetchedData;
            }

            const latestDateInDB = getLatestDateFromData(dbData.historical);

            if (latestDateInDB && latestDateInDB < yesterdayDate) {
              const missingFromDate = addOneDay(latestDateInDB);
              const missingData = await fetchPriceDataForSymbol(
                symbol,
                missingFromDate,
                yesterdayDate,
              );

              const mergedData: HistoricalPriceData = {
                symbol,
                historical: [
                  ...missingData.historical,
                  ...dbData.historical,
                ].sort(
                  (a, b) =>
                    new Date(b.date).getTime() - new Date(a.date).getTime(),
                ),
              };

              await saveDataToDB(symbol, mergedData);
              return mergedData;
            }

            return dbData;
          }),
        );

        return results;
      } catch (e) {
        console.error('Error in useCurrentPortfolioPrices:', e);
        throw e;
      }
    },
    staleTime: 1000 * 60 * 60 * 24,
    gcTime: 1000 * 60 * 60 * 24 * 7,
    enabled: symbols.length > 0,
  });

  return { data, isLoading, error };
};
