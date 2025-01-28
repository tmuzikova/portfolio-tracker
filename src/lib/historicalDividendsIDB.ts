import {
  HistoricalDividendData,
  HistoricalDividendDataWithLastUpdated,
  HistoricalDividendEntry,
} from '@/types/historicalDividends';
import { openDB } from 'idb';

const DB_NAME = 'HistoricalDividendsDB';
const STORE_NAME = 'dividendsData';

export const getDataFromDB = async (
  symbol: string,
): Promise<HistoricalDividendDataWithLastUpdated | null> => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'symbol' });
      }
    },
  });
  return await db.get(STORE_NAME, symbol);
};

export const saveDataToDB = async (
  symbol: string,
  data: HistoricalDividendData,
) => {
  const hasDividends = data.historical.length > 0;

  const db = await openDB(DB_NAME, 1);
  await db.put(STORE_NAME, {
    symbol,
    historical: data.historical,
    lastUpdated: new Date().toISOString(),
    hasDividends,
  });
};

export const getLatestDateFromData = (
  data: HistoricalDividendEntry[] | undefined,
) => {
  if (!data || data.length === 0) return null;

  const sortedData = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return new Date(sortedData[0].date).toISOString().split('T')[0];
};
