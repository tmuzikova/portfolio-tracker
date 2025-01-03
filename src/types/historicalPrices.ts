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
