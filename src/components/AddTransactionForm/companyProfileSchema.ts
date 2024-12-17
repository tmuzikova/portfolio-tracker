import { z } from 'zod';

export const CompanyProfileSchema = z.object({
  symbol: z.string(),
  price: z.number(),
  beta: z.number().nullable(),
  volAvg: z.number(),
  mktCap: z.number(),
  lastDiv: z.number().nullable(),
  range: z.string(),
  changes: z.number(),
  companyName: z.string(),
  currency: z.string(),
  cik: z.string(),
  isin: z.string().nullable(),
  cusip: z.string().nullable(),
  exchange: z.string(),
  exchangeShortName: z.string(),
  industry: z.string().nullable(),
  website: z.string().url(),
  description: z.string().nullable(),
  ceo: z.string().nullable(),
  sector: z.string().nullable(),
  country: z.string().nullable(),
  fullTimeEmployees: z.string().nullable(),
  phone: z.string().nullable(),
  address: z.string().nullable(),
  city: z.string().nullable(),
  state: z.string().nullable(),
  zip: z.string().nullable(),
  dcfDiff: z.number().nullable(),
  dcf: z.number().nullable(),
  image: z.string().url(),
  ipoDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: 'Invalid date format, must be YYYY-MM-DD',
    })
    .nullable(),
  defaultImage: z.boolean(),
  isEtf: z.boolean(),
  isActivelyTrading: z.boolean(),
  isAdr: z.boolean(),
  isFund: z.boolean(),
});

export const CompanyProfileArraySchema = z.array(CompanyProfileSchema);
