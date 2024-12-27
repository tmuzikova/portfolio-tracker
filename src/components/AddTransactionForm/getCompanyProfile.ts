import { api } from '@/api/client';
import { CompanyProfileArraySchema } from './companyProfileSchema';
import { CompanyProfile } from './companyProfileSchema';
import {
  getCompanyProfileFromDB,
  saveCompanyProfileToDB,
} from '@/lib/companyProfileIDB';

const FALLBACK_LOGO = 'src/assets/fallback_logo.png';

const validateImageUrl = async (url: string | null): Promise<string> => {
  try {
    if (!url) {
      return FALLBACK_LOGO;
    }
    const response = await fetch(url, { method: 'HEAD' });
    if (response.ok) {
      return url;
    }
    console.warn(`Invalid image URL: ${url}`);
  } catch (error) {
    console.error(`Error validating image URL: ${url}`, error);
  }
  return FALLBACK_LOGO;
};

const fetchCompanyProfile = async (symbol: string): Promise<CompanyProfile> => {
  try {
    const data = await api.get(`profile/${symbol}`).json();
    const companyProfileArray = CompanyProfileArraySchema.parse(data);
    if (!companyProfileArray.length) {
      throw new Error(`No company profile data found for symbol: ${symbol}`);
    }
    const companyProfile = companyProfileArray[0];
    companyProfile.image = await validateImageUrl(companyProfile.image);
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
