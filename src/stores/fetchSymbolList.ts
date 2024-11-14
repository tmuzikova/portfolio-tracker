export type SymbolList = {
  symbol: string;
  exchange: string;
  exchangeShortName: string;
  price: string;
  name: string;
};

export const fetchSymbolList = async (): Promise<SymbolList[]> => {
  const api_FMP_key = import.meta.env.VITE_FMP_API_KEY;
  const response = await fetch(
    `https://financialmodelingprep.com/api/v3/stock/list?apikey=${api_FMP_key}`,
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch Symbol List: ${response.statusText}`);
  }

  return response.json();
};
