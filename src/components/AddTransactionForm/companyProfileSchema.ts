import { z } from 'zod';

export const CompanyProfileSchema = z.object({
  symbol: z.string(),
  price: z.number().nullable(),
  beta: z.number().nullable(),
  volAvg: z.number().nullable(),
  mktCap: z.number().nullable(),
  lastDiv: z.number().nullable(),
  range: z.string().nullable(),
  changes: z.number().nullable(),
  companyName: z.string(),
  currency: z.string().nullable(),
  cik: z.string().nullable(),
  isin: z.string().nullable(),
  cusip: z.string().nullable(),
  exchange: z.string().nullable(),
  exchangeShortName: z.string().nullable(),
  industry: z.string().nullable(),
  website: z.string().url().nullable(),
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
  image: z.string().url().nullable(),
  ipoDate: z.string().nullable(),
  defaultImage: z.boolean().nullable(),
  isEtf: z.boolean(),
  isActivelyTrading: z.boolean(),
  isAdr: z.boolean(),
  isFund: z.boolean(),
});

export const CompanyProfileArraySchema = z.array(CompanyProfileSchema);

export type CompanyProfile = z.infer<typeof CompanyProfileSchema>;
