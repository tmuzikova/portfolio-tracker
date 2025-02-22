import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { FX_RATE } from './const/FX_RATE';
import { calculationParams } from '@/types/calculations';

export const calculateCurrentInvestedAmount = (
  currentPortfolio: CurrentPortfolioItem[],
) => {
  const totalInvestedAmountWithFees = currentPortfolio.reduce(
    (sum, tx) => sum + (tx.value.total + (tx.totalFees || 0)) * FX_RATE,
    0,
  );
  const totalInvestedAmountNoFees = currentPortfolio.reduce(
    (sum, tx) => sum + tx.value.total * FX_RATE,
    0,
  );

  return {
    withFees: totalInvestedAmountWithFees,
    noFees: totalInvestedAmountNoFees,
  };
};

export const calculateInvestedAmount = ({
  existingTransactions,
  savedTransactions,
}: calculationParams) => {
  const transactions = [...existingTransactions, ...savedTransactions];

  const purchaseTransactions = transactions.filter(
    (tx) => tx.transactionType === 'Nákup',
  );

  const totalInvestedAmountWithFees = purchaseTransactions.reduce(
    (sum, tx) =>
      sum +
      (tx.transactionValue.total + (tx.transactionFee?.total || 0)) * FX_RATE,
    0,
  );
  const totalInvestedAmountNoFees = purchaseTransactions.reduce(
    (sum, tx) => sum + tx.transactionValue.total * FX_RATE,
    0,
  );

  return {
    withFees: totalInvestedAmountWithFees,
    noFees: totalInvestedAmountNoFees,
  };
};
