import { openDB } from 'idb';

export type SymbolList = {
  symbol: string;
  exchange: string;
  exchangeShortName: string;
  price: string;
  name: string;
};

export const fetchSymbolList = async (): Promise<SymbolList[]> => {
  const db = await openDB('symbolDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('symbols')) {
        db.createObjectStore('symbols', { keyPath: 'symbol' });
      }
    },
  });

  const databaseData = await db.getAll('symbols');
  if (databaseData.length > 0) {
    return databaseData;
  }

  const api_FMP_key = import.meta.env.VITE_FMP_API_KEY;
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/stock/list?apikey=${api_FMP_key}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Symbol List: ${response.statusText}`);
  }
  const data = await response.json();

  const tx = db.transaction('symbols', 'readwrite');
  for (const symbol of data) {
    await tx.store.put(symbol);
  }
  await tx.done;

  return data;
};
