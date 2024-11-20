import ky from 'ky';
import { env } from '@/config/env';

export const api = ky.create({
  prefixUrl: env.FMP_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  searchParams: {
    apikey: env.FMP_API_KEY,
  },
});
