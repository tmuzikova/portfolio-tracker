import { HistoricalFxData } from '@/hooks/useHistoricalFX';
import { openDB } from 'idb';

const initDB = async () => {
  const db = await openDB('historicalFxDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('historicalFxData')) {
        db.createObjectStore('historicalFxData', { keyPath: 'symbol' });
      }
    },
  });

  return db;
};

export const saveDataToDB = async (fetchedData: HistoricalFxData) => {
  try {
    const db = await initDB();
    const tx = db.transaction('historicalFxData', 'readwrite');
    const store = tx.objectStore('historicalFxData');

    if (!fetchedData.symbol) {
      console.error('No symbol provided for saving data');
      return;
    }
    await store.put(fetchedData);
    await tx.done;
  } catch (error) {
    console.error('Failed to save data to DB:', error);
    throw error;
  }
};

export const getDataFromDB = async (
  currencyPair: string,
): Promise<HistoricalFxData> => {
  try {
    const db = await initDB();
    const data = (await db.get(
      'historicalFxData',
      currencyPair,
    )) as HistoricalFxData;
    return data;
  } catch (error) {
    console.error('Failed to fetch data from DB:', error);
    throw error;
  }
};
