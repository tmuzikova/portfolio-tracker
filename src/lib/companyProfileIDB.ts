import { CompanyProfile } from '@/components/AddTransactionForm/companyProfileSchema';
import { openDB } from 'idb';

const DB_NAME = 'companyProfileDB';
const STORE_NAME = 'companyProfiles';

const initDB = async () => {
  const db = await openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'symbol' });
      }
    },
  });

  return db;
};

export const saveCompanyProfileToDB = async (
  companyProfile: CompanyProfile,
): Promise<void> => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readwrite');
    const store = tx.objectStore(STORE_NAME);

    await store.put(companyProfile);
    await tx.done;
  } catch (error) {
    console.error(`Error in saveCompanyProfileToDB:`, error);
    throw error;
  }
};

export const getCompanyProfileFromDB = async (
  symbol: string,
): Promise<CompanyProfile | null> => {
  try {
    const db = await initDB();
    const tx = db.transaction(STORE_NAME, 'readonly');
    const store = tx.objectStore(STORE_NAME);
    const companyProfile = (await store.get(symbol)) as CompanyProfile;
    await tx.done;

    return companyProfile || null;
  } catch (error) {
    console.error(
      `Error in getCompanyProfileFromDB for symbol: ${symbol}`,
      error,
    );
    throw error;
  }
};
