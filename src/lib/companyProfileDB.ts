import { CompanyProfile } from '@/components/AddTransactionForm/companyProfileSchema';

import { supabase } from './supabaseClient';

export const saveCompanyProfileToDB = async (
  companyProfile: CompanyProfile,
): Promise<void> => {
  try {
    const { error } = await supabase
      .from('company_profiles')
      .upsert(companyProfile, {
        //upsert = insert or update
        onConflict: 'symbol',
      });

    if (error) throw error;
  } catch (error) {
    console.error(`Error in saveCompanyProfileToDB:`, error);
    throw error;
  }
};

export const getCompanyProfileFromDB = async (
  symbol: string,
): Promise<CompanyProfile | null> => {
  try {
    const { data } = await supabase
      .from('company_profiles')
      .select()
      .eq('symbol', symbol)
      .maybeSingle(); // returns null if no record found

    return data || null;
  } catch (error) {
    console.error(
      `Error in getCompanyProfileFromDB for symbol: ${symbol}`,
      error,
    );
    throw error;
  }
};
