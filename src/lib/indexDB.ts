import { SymbolList } from '@/hooks/useSymbolList';
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

export const getDataFromDB = async () => {
  const db = await initDB();
  const databaseData = (await db.getAll('symbols')) as SymbolList[];
  return databaseData;
};
