import {
  HistoricalPriceData,
  HistoricalPriceEntry,
} from '@/types/historicalPrices';
import { openDB } from 'idb';

const DB_NAME = 'StockPriceDB';
const STORE_NAME = 'priceData';

export const getDataFromDB = async (symbol: string) => {
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
  data: HistoricalPriceData,
) => {
  const db = await openDB(DB_NAME, 1);

  const existingData = await db.get(STORE_NAME, symbol);

  if (existingData) {
    const mergedHistorical = [
      ...data.historical,
      ...(existingData.historical || []),
    ]
      .filter(
        (entry, index, self) =>
          index === self.findIndex((t) => t.date === entry.date),
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    await db.put(STORE_NAME, {
      symbol,
      historical: mergedHistorical,
    });
  } else {
    await db.put(STORE_NAME, data);
  }
};

export const getLatestDateFromData = (
  data: HistoricalPriceEntry[] | undefined,
) => {
  if (!data || data.length === 0) return null;

  const sortedData = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return new Date(sortedData[0].date).toISOString().split('T')[0];
};

export const addOneDay = (date: string) => {
  const nextDay = new Date(date);
  nextDay.setDate(nextDay.getDate() + 1);
  return nextDay.toISOString().split('T')[0];
};
