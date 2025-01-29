import { calculationParams } from '@/types/calculations';
import { FX_RATE } from './const/FX_RATE';

export const calculateTotalFees = ({ transactions }: calculationParams) => {
  const totalFees = transactions.reduce((sum, tx) => {
    return sum + (tx.transactionFee?.total || 0) * FX_RATE;
  }, 0);

  return totalFees;
};
