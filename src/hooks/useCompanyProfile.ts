import { useQuery } from '@tanstack/react-query';
import {
  CompanyProfile,
  CompanyProfileArraySchema,
} from '@/components/AddTransactionForm/companyProfileSchema';
import {
  getCompanyProfileFromDB,
  saveCompanyProfileToDB,
} from '@/lib/companyProfileDB';
import { api } from '@/api/client';

const fetchCompanyProfile = async (symbol: string): Promise<CompanyProfile> => {
  const data = await api.get(`profile/${symbol}`).json();
  const companyProfileArray = CompanyProfileArraySchema.parse(data);
  if (!companyProfileArray.length) {
    throw new Error(`No company profile data found for symbol: ${symbol}`);
  }

  const companyProfile = companyProfileArray[0];

  return companyProfile;
};

const companyProfileQueryFn = async (
  symbol: string,
): Promise<CompanyProfile> => {
  const dbData = await getCompanyProfileFromDB(symbol);
  if (dbData) {
    return dbData;
  }

  const profileData = await fetchCompanyProfile(symbol);
  await saveCompanyProfileToDB(profileData);

  return profileData;
};

export const useCompanyProfileManual = (symbol: string) => {
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

export const useCompanyProfile = (symbol: string) => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['companyProfile', symbol],
    queryFn: () => companyProfileQueryFn(symbol),
    enabled: !!symbol,
  });

  return {
    companyProfile: data,
    isLoading,
    error,
  };
};
