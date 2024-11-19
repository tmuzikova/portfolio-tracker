import { getDataFromDB } from '@/lib/indexDB';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

export type SymbolList = {
  symbol: string;
  exchange: string;
  exchangeShortName: string;
  price: string;
  name: string;
};

const api_FMP_key = import.meta.env.VITE_FMP_API_KEY;

export const fetchSymbolList = async (): Promise<SymbolList[]> => {
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/stock/list?apikey=${api_FMP_key}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Symbol List: ${response.statusText}`);
  }

  const data = await response.json();

  return data;
};

export const useSymbolList = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [dbData, setDbData] = useState<SymbolList[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      try {
        const data = await getDataFromDB();
        if (data.length === 0) {
          setIsEnabled(true);
          return;
        }
        setDbData(data);
        console.log('Data from IndexedDB:', data);
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    void getData();
  }, []);

  const response = useQuery({
    queryKey: ['symbolList'],
    queryFn: fetchSymbolList,
    staleTime: Infinity,
    gcTime: Infinity,
    enabled: isEnabled,
  });

  return {
    data: response.data || dbData,
    isLoading: response.isLoading || isLoading,
  };
};
