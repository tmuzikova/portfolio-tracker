import {
  HistoricalDividendData,
  HistoricalDividendDataWithLastUpdated,
  HistoricalDividendEntry,
} from '@/types/historicalDividends';
import { supabase } from './supabaseClient';

export const getDataFromDB = async (
  symbol: string,
): Promise<HistoricalDividendDataWithLastUpdated | null> => {
  const { data, error } = await supabase
    .from('historical_dividends')
    .select('*')
    .eq('symbol', symbol)
    .single();

  if (error) {
    console.error('Error fetching dividend data:', error);
    return null;
  }

  if (!data) return null;

  return {
    symbol: data.symbol,
    historical: data.historical,
    lastUpdated: data.lastUpdated,
    hasDividends: data.hasDividends,
  };
};

export const saveDataToDB = async (
  symbol: string,
  data: HistoricalDividendData,
) => {
  const hasDividends = data.historical.length > 0;

  const { error } = await supabase.from('historical_dividends').upsert(
    {
      symbol,
      historical: data.historical,
      lastUpdated: new Date().toISOString(),
      hasDividends: hasDividends,
    },
    {
      onConflict: 'symbol',
    },
  );

  if (error) {
    console.error('Error saving dividend data:', error);
    throw error;
  }
};

export const getLatestDateFromData = (
  data: HistoricalDividendEntry[] | undefined,
) => {
  if (!data || data.length === 0) return null;

  const sortedData = [...data].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return new Date(sortedData[0].date).toISOString().split('T')[0];
};
