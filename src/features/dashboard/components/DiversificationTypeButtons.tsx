import { Button } from '@/components/ui/button';
import { DiversificationType } from './PieChartCard';

const diversificationTypes: DiversificationType[] = [
  'Aktiva',
  'Typ aktiva',
  'Sektor',
  'Dividendy',
];

export const DiversificationTypeButtons = ({
  selectedType,
  onSelectType,
}: {
  selectedType: DiversificationType;
  onSelectType: (type: DiversificationType) => void;
}) => (
  <div className="flex gap-2 pb-2 pt-6 lg:pt-0">
    {diversificationTypes.map((type) => (
      <Button
        key={type}
        onClick={() => onSelectType(type)}
        className={`rounded-md px-4 py-2 text-sm ${
          selectedType === type
            ? 'text-white'
            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {type}
      </Button>
    ))}
  </div>
);
