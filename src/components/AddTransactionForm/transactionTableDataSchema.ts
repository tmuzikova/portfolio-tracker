import { z } from 'zod';

export const transactionTableDataSchema = z.object({
  id: z.string(),
  transactionType: z.enum(['Nákup', 'Prodej'], {
    required_error: 'Transaction type must be "Nákup" or "Prodej".',
  }),
  holding: z.object({
    holdingIcon: z.string(),
    holdingSymbol: z.string(),
    holdingName: z.string(),
  }),
  transactionDate: z.string(),
  numberOfStocks: z.number(),
  transactionValue: z.object({
    total: z.number(),
    perShare: z.number(),
    currency: z.string(),
  }),
  transactionFee: z
    .object({
      total: z.number(),
      currency: z.string(),
    })
    .optional(),
  sector: z.string(),
  type: z.object({
    isFund: z.boolean(),
    isEtf: z.boolean(),
  }),
});
