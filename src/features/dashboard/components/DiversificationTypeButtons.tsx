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
  <div className="mx-2 flex flex-wrap justify-center gap-2 pb-2 pt-6 lg:pt-0">
    {diversificationTypes.map((type) => (
      <Button
        key={type}
        onClick={() => onSelectType(type)}
        className={`rounded-md px-4 py-2 text-sm ${
          selectedType === type
            ? 'text-white'
            : 'bg-slate-200 text-primary hover:bg-slate-300'
        }`}
      >
        {type}
      </Button>
    ))}
  </div>
);
