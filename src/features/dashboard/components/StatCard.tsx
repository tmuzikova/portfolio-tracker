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
    <Card className={`h-[150px] w-[371px] ${props.className}`}>
      <CardHeader>
        <div className="">
          <div className="flex items-center gap-2">
            <CardDescription>{props.title}</CardDescription>
            {props.tooltip && (
              <QuestionMarkTooltip>{props.tooltip}</QuestionMarkTooltip>
            )}
          </div>
          <CardTitle>{props.children}</CardTitle>
        </div>
      </CardHeader>
    </Card>
  );
};
