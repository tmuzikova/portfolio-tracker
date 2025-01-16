// components/HoldingCell.tsx
import { useState } from 'react';
import FallbackLogo from '@/assets/fallback_logo.svg?react';
import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';

type HoldingCellProps = {
  holding: TransactionTableData['holding'];
};

export const HoldingCell = ({ holding }: HoldingCellProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex items-center space-x-4 text-left">
      <div
        className="flex items-center justify-center rounded-full bg-primary"
        style={{ width: '3rem', height: '3rem', flexShrink: 0 }}
      >
        {holding.holdingIcon && !hasError ? (
          <img
            src={holding.holdingIcon}
            alt={holding.holdingSymbol}
            className="h-8 w-8 object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <FallbackLogo className="h-8 w-8" />
        )}
      </div>
      <div>
        <div className="font-medium">{holding.holdingSymbol}</div>
        <div>{holding.holdingName}</div>
      </div>
    </div>
  );
};
