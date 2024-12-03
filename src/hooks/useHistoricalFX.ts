import { api } from '@/api/client';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { z } from 'zod';

const HistoricalFxEntrySchema = z.object({
  date: z.string(),
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
  label: z.string(),
  changeOverTime: z.number(),
});

export const HistoricalFxDataSchema = z.object({
  symbol: z.string().min(1, 'Symbol must not be empty'),
  historical: z.array(HistoricalFxEntrySchema),
});

export type HistoricalFxData = z.infer<typeof HistoricalFxDataSchema>;
export type HistoricalFxEntry = z.infer<typeof HistoricalFxEntrySchema>;

export const fetchHistoricalFxData = async (
  transactionCurrency: string,
  date: string,
): Promise<{
  historicalFxData: HistoricalFxData;
  historicalFxEntry: HistoricalFxEntry | undefined;
}> => {
  try {
    const response = await api.get(
      `historical-price-full/${transactionCurrency}CZK`,
    );
    const data = await response.json();
    const validatedData = HistoricalFxDataSchema.parse(data);

    const historicalFxEntry = validatedData.historical.find(
      (entry) => entry.date === date,
    );

    return { historicalFxData: validatedData, historicalFxEntry };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        `FX data for ${transactionCurrency}CZK Validation Failed:`,
        error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
      );
      throw new Error(
        `Invalid historical FX data for ${transactionCurrency}CZK`,
      );
    }
    console.error(
      `Failed to fetch historical FX data for ${transactionCurrency}CZK:`,
      error,
    );
    throw error;
  }
};

export const useHistoricalFxData = (
  transactionCurrency: string,
  date: string,
) => {
  const [isEnabled, setIsEnabled] = useState(true);

  const response = useQuery({
    queryKey: ['historicalFxData', transactionCurrency, date],
    queryFn: () => fetchHistoricalFxData(transactionCurrency, date),
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: isEnabled,
  });

  return {
    entryDataClose: response.data?.historicalFxEntry?.close,
    fullHistory: response.data?.historicalFxData.historical,
    isLoading: response.isLoading,
  };
};
