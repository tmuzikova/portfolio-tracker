import { useQuery } from '@tanstack/react-query';
import {
  CompanyProfile,
  CompanyProfileArraySchema,
} from '@/components/AddTransactionForm/companyProfileSchema';
import {
  getCompanyProfileFromDB,
  saveCompanyProfileToDB,
} from '@/lib/companyProfileIDB';
import { api } from '@/api/client';

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
  const data = await api.get(`profile/${symbol}`).json();
  const companyProfileArray = CompanyProfileArraySchema.parse(data);
  if (!companyProfileArray.length) {
    throw new Error(`No company profile data found for symbol: ${symbol}`);
  }
  const companyProfile = companyProfileArray[0];
  companyProfile.image = await validateImageUrl(companyProfile.image);
  return companyProfile;
};

const companyProfileQueryFn = async (
  symbol: string,
): Promise<CompanyProfile> => {
  try {
    const dbData = await getCompanyProfileFromDB(symbol);
    if (dbData) {
      return dbData;
    }
  } catch (e) {
    console.error(
      `Error getting company profile from DB for symbol: ${symbol}`,
      e,
    );
  }

  const profileData = await fetchCompanyProfile(symbol);

  try {
    await saveCompanyProfileToDB(profileData);
  } catch (e) {
    console.error(
      `Error saving company profile to DB for symbol: ${symbol}`,
      e,
    );
  }

  return profileData;
};

export const useCompanyProfile = (symbol: string) => {
  const { data, refetch } = useQuery({
    queryKey: ['companyProfile', symbol],
    queryFn: () => companyProfileQueryFn(symbol),
    enabled: false,
  });

  return {
    companyProfile: data,
    refetch,
  };
};
