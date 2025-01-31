import {
  HistoricalPriceData,
  HistoricalPriceEntry,
} from '@/types/historicalPrices';
import { supabase } from './supabaseClient';

const deduplicateAndSortHistorical = (
  entries: HistoricalPriceEntry[],
): HistoricalPriceEntry[] => {
  return entries
    .filter(
      (entry, index, self) =>
        index === self.findIndex((t) => t.date === entry.date),
    )
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

const mergeHistoricalData = (
  newData: HistoricalPriceEntry[],
  existingData: HistoricalPriceEntry[] = [],
): HistoricalPriceEntry[] => {
  return deduplicateAndSortHistorical([...newData, ...existingData]);
};

export const getDataFromDB = async (symbol: string) => {
  try {
    const { data } = await supabase
      .from('historical_stock_prices')
      .select('*')
      .eq('symbol', symbol);

    return data ? data[0] : null;
  } catch (error) {
    console.error('Error fetching price data:', error);
    return null;
  }
};

export const saveDataToDB = async (
  symbol: string,
  data: HistoricalPriceData,
) => {
  try {
    const { data: existingData } = await supabase
      .from('historical_stock_prices')
      .select('*')
      .eq('symbol', symbol)
      .maybeSingle();

    const historicalData = existingData
      ? mergeHistoricalData(data.historical, existingData.historical)
      : data.historical;

    await supabase
      .from('historical_stock_prices')
      .upsert({ symbol, historical: historicalData }, { onConflict: 'symbol' });
  } catch (error) {
    console.error('Error saving price data:', error);
    throw error;
  }
};
