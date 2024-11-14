import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { SymbolList, fetchSymbolList } from './fetchSymbolList';

type SymbolListContextProps = {
  symbolList: SymbolList[] | undefined;
  isLoading: boolean;
  isError: boolean;
};

const SymbolListContext = createContext<SymbolListContextProps | undefined>(
  undefined,
);

export const SymbolListProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const {
    data: symbolList,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['symbolList'],
    queryFn: fetchSymbolList,
    staleTime: Infinity,
    gcTime: Infinity,
  });

  return (
    <SymbolListContext.Provider value={{ symbolList, isLoading, isError }}>
      {children}
    </SymbolListContext.Provider>
  );
};

export const useSymbolListContext = () => {
  const context = useContext(SymbolListContext);

  if (!context) {
    throw new Error(
      'useSymbolListContext must be used within a SymbolListProvider',
    );
  }

  return context;
};
