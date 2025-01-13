import { z } from 'zod';

export const historicalDividendEntrySchema = z.object({
  date: z.string(),
  label: z.string(),
  adjDividend: z.number(),
  dividend: z.number(),
  recordDate: z.string().optional(),
  paymentDate: z.string().optional(),
  declarationDate: z.string().optional(),
});

export const historicalDividendDataSchema = z.object({
  symbol: z.string(),
  historical: z.array(historicalDividendEntrySchema),
});

export type HistoricalDividendData = z.infer<
  typeof historicalDividendDataSchema
>;
export type HistoricalDividendEntry = z.infer<
  typeof historicalDividendEntrySchema
>;
