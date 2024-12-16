import { calculationParams } from '../../types/calculations';
import { FX_RATE } from './const/FX_RATE';

export const calculateTotalFees = ({
  existingTransactions,
  savedTransactions,
}: calculationParams) => {
  const transactions = [...existingTransactions, ...savedTransactions];

  const totalFees = transactions.reduce((sum, tx) => {
    return sum + (tx.transactionFee?.total || 0) * FX_RATE;
  }, 0);

  return totalFees;
};
