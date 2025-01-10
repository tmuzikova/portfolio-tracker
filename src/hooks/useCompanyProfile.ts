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
import FallbackLogo from '@/assets/fallback_logo.svg';

const validateImageUrl = async (url: string): Promise<boolean> => {
  try {
    const response = await fetch(url, { method: 'HEAD' });
    return response.ok;
  } catch (error) {
    console.error(`Error validating image URL: ${url}`, error);
    return false;
  }
};

const fetchCompanyProfile = async (symbol: string): Promise<CompanyProfile> => {
  const data = await api.get(`profile/${symbol}`).json();
  const companyProfileArray = CompanyProfileArraySchema.parse(data);
  if (!companyProfileArray.length) {
    throw new Error(`No company profile data found for symbol: ${symbol}`);
  }

  const imageUrl = companyProfileArray[0].image;

  const companyProfile = {
    ...companyProfileArray[0],
    image:
      imageUrl && (await validateImageUrl(imageUrl)) ? imageUrl : FallbackLogo,
  };

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
