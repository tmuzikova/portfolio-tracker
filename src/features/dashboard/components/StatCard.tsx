import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionMarkTooltip } from './QuestionMarkTooltip';

export type CardData = {
  value: string;
  tooltip?: string;
  title: string;
};

type StatCardProps = {
  data: CardData;
  children?: React.ReactNode;
  className?: string;
};

export const StatCard = (props: StatCardProps) => {
  return (
    <Card
      className={`flex h-[150px] flex-col justify-between ${props.className}`}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle className="text-[18px] font-normal text-muted-foreground">
            {props.data.title}
          </CardTitle>
          {props.data.tooltip && (
            <QuestionMarkTooltip>{props.data.tooltip}</QuestionMarkTooltip>
          )}
        </div>
      </CardHeader>

      <div>
        <CardContent className="text-[28px] font-semibold">
          {props.data.value} CZK
          {props.children}
        </CardContent>
      </div>
    </Card>
  );
};
