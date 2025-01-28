// components/HoldingCell.tsx
import { useState } from 'react';
import FallbackLogo from '@/assets/fallback_logo.svg?react';
import { TransactionTableData } from '@/components/AddTransactionForm/AddTransactionForm';
import { Link } from 'react-router-dom';

type HoldingCellProps = {
  holding: TransactionTableData['holding'];
};

export const HoldingCell = ({ holding }: HoldingCellProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex items-center space-x-4 text-left">
      <Link to={`/detail/${holding.holdingSymbol}`}>
        <div
          className="flex items-center justify-center rounded-full bg-gray-400"
          style={{ width: '4rem', height: '4rem', flexShrink: 0 }}
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
      </Link>
      <div>
        <div className="font-medium hover:underline">
          <Link to={`/detail/${holding.holdingSymbol}`}>
            {holding.holdingSymbol}
          </Link>
        </div>
        <div className="hover:underline">
          <Link to={`/detail/${holding.holdingSymbol}`}>
            {holding.holdingName}
          </Link>
        </div>
      </div>
    </div>
  );
};
