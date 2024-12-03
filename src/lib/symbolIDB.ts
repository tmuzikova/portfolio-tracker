import { SymbolItem } from '@/hooks/useSymbolList';
import { openDB } from 'idb';

const initDB = async () => {
  const db = await openDB('symbolDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('symbols')) {
        db.createObjectStore('symbols', { keyPath: 'symbol' });
      }
    },
  });

  return db;
};

export const saveDataToDB = async (fetchedData: SymbolItem[]) => {
  const db = await initDB();
  const tx = db.transaction('symbols', 'readwrite');
  const store = tx.objectStore('symbols');

  await store.clear();
  await Promise.all(fetchedData.map((item) => store.put(item)));
  await tx.done;
};

export const getDataFromDB = async (): Promise<SymbolItem[]> => {
  const db = await initDB();
  const databaseData = (await db.getAll('symbols')) as SymbolItem[];
  return databaseData;
};
