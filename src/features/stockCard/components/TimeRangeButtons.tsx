import { Button } from '@/components/ui/button';
import { TimeRange } from './StockCard';

export const TimeRangeButtons = ({
  ranges,
  selectedRange,
  onChange,
}: {
  ranges: TimeRange[];
  selectedRange: TimeRange;
  onChange: (range: TimeRange) => void;
}) => (
  <div className="!mt-0 flex flex-wrap justify-center gap-2 px-6 sm:py-6">
    {ranges.map((range) => (
      <Button
        key={range}
        onClick={() => onChange(range)}
        className={`rounded-md px-4 py-2 text-sm ${
          selectedRange === range
            ? 'text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {range}
      </Button>
    ))}
  </div>
);
