import { ArrowUpDown as ArrowUpDownIcon } from 'lucide-react';
import { Button } from './ui/button';
import { ReactNode } from 'react';

type TableColumnHeaderProps = {
  children: ReactNode;
  toggleColumnSorting?: () => void;
  buttonClassName?: string;
  className?: string;
};

export const TableColumnHeader = ({
  children,
  toggleColumnSorting,
  buttonClassName = '',
  className = '',
}: TableColumnHeaderProps) => {
  return (
    <div className={className}>
      <Button
        variant="ghost"
        onClick={() => {
          toggleColumnSorting?.();
        }}
        className={buttonClassName}
      >
        {children}
        {toggleColumnSorting && <ArrowUpDownIcon className="ml-2 h-4 w-4" />}
      </Button>
    </div>
  );
};
