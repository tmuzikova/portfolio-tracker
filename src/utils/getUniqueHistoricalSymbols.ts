import { calculationParams } from '@/types/calculations';

export const getUniqueHistoricalSymbols = ({
  transactions,
}: calculationParams): string[] => {
  const uniqueSymbols = new Set(
    transactions.map((tx) => tx.holding.holdingSymbol),
  );

  return Array.from(uniqueSymbols);
};
