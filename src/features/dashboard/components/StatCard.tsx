import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { QuestionMarkTooltip } from './QuestionMarkTooltip';

type StatCard = {
  title: string;
  tooltip?: string;
  className?: string;
  children: React.ReactNode;
};

export const StatCard = (props: StatCard) => {
  return (
    <Card
      className={`flex h-[150px] flex-col justify-between ${props.className}`}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-[18px] font-normal text-muted-foreground">
            {props.title}
          </CardTitle>
          {props.tooltip && (
            <QuestionMarkTooltip>{props.tooltip}</QuestionMarkTooltip>
          )}
        </div>
      </CardHeader>

      <div className="px-6 pb-4">
        <CardTitle className="text-[28px] font-semibold">
          {props.children}
        </CardTitle>
      </div>
    </Card>
  );
};
