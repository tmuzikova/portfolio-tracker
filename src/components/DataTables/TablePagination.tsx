import { Button } from '../ui/button';

type TablePaginationProps = {
  getPreviousPage: () => void;
  getNextPage: () => void;
  isPreviousPageDisabled: boolean;
  isNextPageDisabled: boolean;
};

export const TablePagination = ({
  getPreviousPage,
  getNextPage,
  isPreviousPageDisabled,
  isNextPageDisabled,
}: TablePaginationProps) => {
  return (
    <div className="flex items-center justify-end space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={getPreviousPage}
        disabled={isPreviousPageDisabled}
      >
        Předchozí
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={getNextPage}
        disabled={isNextPageDisabled}
      >
        Další
      </Button>
    </div>
  );
};
