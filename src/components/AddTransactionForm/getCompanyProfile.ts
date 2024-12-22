import { api } from '@/api/client';
import { CompanyProfileArraySchema } from './companyProfileSchema';
import { CompanyProfile } from './companyProfileSchema';
import {
  getCompanyProfileFromDB,
  saveCompanyProfileToDB,
} from '@/lib/companyProfileIDB';

const fetchCompanyProfile = async (symbol: string): Promise<CompanyProfile> => {
  try {
    const data = await api.get(`profile/${symbol}`).json();
    const companyProfileArray = CompanyProfileArraySchema.parse(data);
    if (!companyProfileArray.length) {
      throw new Error(`No company profile data found for symbol: ${symbol}`);
    }
    const companyProfile = companyProfileArray[0];
    return companyProfile;
  } catch (error) {
    console.error(`Error fetching company profile for ${symbol}:`, error);
    throw error;
  }
};

export const getCompanyProfile = async (
  symbol: string,
): Promise<CompanyProfile> => {
  try {
    const dbData = await getCompanyProfileFromDB(symbol);
    if (dbData) {
      return dbData;
    }
  } catch (e) {
    console.error('Error getting data from IndexedDB:', e);
  }

  const profileData = await fetchCompanyProfile(symbol);

  try {
    await saveCompanyProfileToDB(profileData);
  } catch (e) {
    console.error('Error saving to IndexedDB:', e);
  }

  return profileData;
};
