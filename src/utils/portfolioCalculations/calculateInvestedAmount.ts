import { FX_RATE } from './const/FX_RATE';
import { calculationParams } from '../../types/types';

export const calculateInvestedAmount = ({
  existingTransactions,
  savedTransactions,
}: calculationParams) => {
  const transactions = [...existingTransactions, ...savedTransactions];

  const purchaseTransactions = transactions.filter(
    (tx) => tx.transactionType === 'Nákup',
  );

  const totalInvestedAmountWithFees = purchaseTransactions.reduce((sum, tx) => {
    return (
      sum +
      (tx.transactionValue.total + (tx.transactionFee?.total || 0)) * FX_RATE
    );
  }, 0);
  const totalInvestedAmountNoFees = purchaseTransactions.reduce((sum, tx) => {
    return sum + tx.transactionValue.total * FX_RATE;
  }, 0);

  const investedAmount = {
    withFees: totalInvestedAmountWithFees,
    noFees: totalInvestedAmountNoFees,
  };

  return investedAmount;
};
