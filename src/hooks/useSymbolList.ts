import { api } from '@/api/client';
import { getDataFromDB, saveDataToDB } from '@/lib/symbolDB';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { z } from 'zod';

export const SymbolItemSchema = z.object({
  symbol: z.string().min(1, 'Symbol must not be empty'),
  exchange: z.string().nullable().default('Unknown'),
  exchangeShortName: z.string().nullable().default('Unknown'),
  price: z
    .number()
    .nonnegative('Price must be a valid non-negative number')
    .nullable(),
  name: z.string().nullable().default('Unknown'),
});

export type SymbolItem = z.infer<typeof SymbolItemSchema>;

export const fetchSymbolList = async (): Promise<SymbolItem[]> => {
  try {
    const response = await api.get('stock/list');
    const data = await response.json();
    const validatedData = z.array(SymbolItemSchema).parse(data);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error(
        'Symbol List Validation Failed:',
        error.errors.map((err) => `${err.path.join('.')}: ${err.message}`),
      );
      throw new Error('Invalid symbol list data');
    }
    console.error('Failed to fetch symbol list:', error);
    throw error;
  }
};

export const useSymbolList = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [dbData, setDbData] = useState<SymbolItem[]>([]);
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

  useEffect(() => {
    const saveToDB = async () => {
      if (response.isSuccess && response.data) {
        try {
          await saveDataToDB(response.data);
          setDbData(response.data);
        } catch (e) {
          console.error(e);
        }
      }
    };

    void saveToDB();
  }, [response.isSuccess, response.data]);

  return {
    data: response.data || dbData,
    isLoading: response.isLoading || isLoading,
  };
};
