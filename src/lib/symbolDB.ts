import { SymbolItem } from '@/hooks/useSymbolList';

import { supabase } from './supabaseClient';

export const saveDataToDB = async (fetchedData: SymbolItem[]) => {
  try {
    await supabase.from('symbol_list').upsert(fetchedData, {
      onConflict: 'symbol',
    });
  } catch (error) {
    console.error('Error saving symbols:', error);
    throw error;
  }
};

export const getDataFromDB = async (): Promise<SymbolItem[]> => {
  try {
    const { data } = await supabase
      .from('symbol_list')
      .select('symbol, name, exchange, exchangeShortName, price')
      .order('symbol');

    return data || [];
  } catch (error) {
    console.error('Error fetching symbols:', error);
    throw error;
  }
};
