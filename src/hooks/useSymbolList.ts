import { api } from '@/api/client';
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

export const fetchSymbolList = async (): Promise<SymbolList[]> => {
  try {
    const response = await api.get('stock/list');
    return await response.json();
  } catch (error) {
    console.error('Failed to fetch symbol list:', error);
    throw error;
  }
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
