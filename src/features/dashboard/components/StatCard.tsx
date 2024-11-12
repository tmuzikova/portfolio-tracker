import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { QuestionMarkTooltip } from './QuestionMarkTooltip';

type StatCardProps = {
  title: string;
  tooltip?: string;
  className?: string;
  children: React.ReactNode;
};

export const StatCard = (props: StatCardProps) => {
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

      <div>
        <CardContent className="text-[28px] font-semibold">
          {props.children}
        </CardContent>
      </div>
    </Card>
  );
};
