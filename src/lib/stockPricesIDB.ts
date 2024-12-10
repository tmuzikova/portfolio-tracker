import {
  HistoricalPriceData,
  HistoricalPriceEntry,
} from '@/hooks/useCurrentPortfolioHistoricalPrices';
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

  // Check if the symbol already exists in the database
  const existingData = await db.get(STORE_NAME, symbol);

  if (existingData) {
    // If data exists, merge the new data with existing data
    const mergedHistorical = [
      ...data.historical,
      ...(existingData.historical || []),
    ]
      // Remove duplicates and sort by date (most recent first)
      .filter(
        (entry, index, self) =>
          index === self.findIndex((t) => t.date === entry.date),
      )
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Update the database with merged and deduplicated data
    await db.put(STORE_NAME, {
      symbol,
      historical: mergedHistorical,
    });
  } else {
    // If no existing data, simply add the new data
    await db.put(STORE_NAME, data);
  }
};

export const getLatestDateFromData = (
  data: HistoricalPriceEntry[] | undefined,
) => {
  if (!data || data.length === 0) return null;

  // Sort the data by date in descending order and get the first (most recent) entry's date
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
