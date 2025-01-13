import { calculationParams } from '@/types/calculations';

export const getUniqueHistoricalSymbols = ({
  existingTransactions,
  savedTransactions,
}: calculationParams): string[] => {
  const transactions = [...existingTransactions, ...savedTransactions];

  const uniqueSymbols = new Set(
    transactions.map((tx) => tx.holding.holdingSymbol),
  );

  return Array.from(uniqueSymbols);
};
