import { formatNumber } from '@/utils/formatNumber';
import { CardData, StatCard } from './StatCard';
import {
  Wallet,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Coins,
  Receipt,
  BarChart3,
} from 'lucide-react';
import { useStatCardData } from '@/hooks/useStatData';
import { LoadingState } from '@/components/LoadingState';

export const StatCards = () => {
  const { isLoading, statData, calculatedValues } = useStatCardData();

  const getProfitColorAndIcon = (value: number) => {
    const isPositive = value >= 0;
    return {
      icon: isPositive ? (
        <TrendingUp className="h-5 w-5 text-[hsl(var(--chart-2))]" />
      ) : (
        <TrendingDown className="h-5 w-5 text-destructive" />
      ),
      valueColor: isPositive
        ? 'text-[hsl(var(--chart-2))]'
        : 'text-destructive',
    };
  };

  const unrealizedProfitStyle = getProfitColorAndIcon(
    statData.unrealizedProfit,
  );
  const realizedProfitStyle = getProfitColorAndIcon(statData.realizedProfit);

  const cardData: { [key: string]: CardData } = {
    portfolioValue: {
      value: formatNumber(calculatedValues.portfolioValue),
      tooltip:
        'Hodnota aktuálního portfolia bez realizovaného zisku, poplatků a dividend.',
      title: 'Hodnota portfolia',
      icon: <Wallet className="h-5 w-5 text-[hsl(var(--chart-1))]" />,
      valueColor: 'text-[hsl(var(--chart-1))]',
    },
    totalValue: {
      value: formatNumber(calculatedValues.totalValue),
      tooltip:
        'Celková hodnota portfolia se započítaným realizovaným ziskem a poplatky.',
      title: 'Celková hodnota portfolia',
      icon: <BarChart3 className="h-5 w-5 text-[hsl(var(--chart-3))]" />,
      valueColor: 'text-[hsl(var(--chart-3))]',
    },
    unrealizedProfit: {
      value: formatNumber(statData.unrealizedProfit),
      tooltip:
        'Rozdíl mezi nákupní a současnou cenou aktuálně vlastněných aktiv.',
      title: 'Nerealizovaný zisk',
      icon: unrealizedProfitStyle.icon,
      valueColor: unrealizedProfitStyle.valueColor,
    },
    realizedProfit: {
      value: formatNumber(statData.realizedProfit),
      tooltip: 'Realizovaný zisk z prodeje aktiv.',
      title: 'Realizovaný zisk',
      icon: realizedProfitStyle.icon,
      valueColor: realizedProfitStyle.valueColor,
    },
    investedAmount: {
      value: formatNumber(statData.investedAmountInCurrentPortfolio.noFees),
      tooltip:
        'Celková historická investovaná částka a investovaná částka do aktuálního portfolia (bez zahrnutých poplatků).',
      title: 'Investovaná částka',
      icon: <PiggyBank className="h-5 w-5 text-[hsl(var(--chart-4))]" />,
      valueColor: 'text-[hsl(var(--chart-4))]',
    },
    dividends: {
      value: formatNumber(statData.dividends),
      tooltip: 'Celková suma vyplacených dividend za dobu existence portfolia.',
      title: 'Dividendy',
      icon: <Coins className="h-5 w-5 text-[hsl(var(--chart-5))]" />,
      valueColor: 'text-[hsl(var(--chart-5))]',
    },
    fees: {
      value: formatNumber(statData.fees),
      tooltip: 'Poplatky za obchodování.',
      title: 'Poplatky',
      icon: <Receipt className="h-5 w-5 text-[hsl(var(--chart-7))]" />,
      valueColor: 'text-[hsl(var(--chart-7))]',
    },
  };

  if (isLoading) {
    return <LoadingState />;
  }

  return (
    <div className="grid w-full grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
      <div className="flex flex-col gap-5">
        <StatCard data={cardData.portfolioValue} className="md:h-[320px]" />
        <StatCard data={cardData.totalValue} />
      </div>

      <div className="flex flex-col gap-5 md:col-span-1">
        <StatCard data={cardData.unrealizedProfit}>
          {calculatedValues.unrealizedProfitRelativeToPortfolioValue && (
            <div className="mt-2 text-sm font-normal text-muted-foreground">
              <span className={unrealizedProfitStyle.valueColor}>
                {calculatedValues.unrealizedProfitRelativeToPortfolioValue} %
              </span>{' '}
              z hodnoty portfolia
            </div>
          )}
        </StatCard>
        <StatCard data={cardData.realizedProfit} />
        <StatCard data={cardData.investedAmount}>
          <div className="mt-2 text-sm font-normal text-muted-foreground">
            Historicky investováno{' '}
            <span
              className={`${cardData.investedAmount.valueColor} font-semibold`}
            >
              {formatNumber(statData.historicalInvestedAmount.noFees)} CZK
            </span>
          </div>
        </StatCard>
      </div>

      <div className="flex flex-col gap-5 md:col-span-2 lg:col-span-1">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-1">
          <StatCard data={cardData.dividends} className="h-[320px]">
            <div className="mt-4 space-y-2">
              <div className="text-sm font-normal text-muted-foreground">
                Dividendový výnos
              </div>
              <div className="text-xl text-[hsl(var(--chart-5))]">
                {calculatedValues.dividendYield} %
              </div>

              <div className="text-sm font-normal text-muted-foreground">
                Dividendový výnos vzhledem k nákladům
              </div>
              <div className="text-xl text-[hsl(var(--chart-5))]">
                {calculatedValues.dividendYieldOnCost} %
              </div>
            </div>
          </StatCard>

          <StatCard data={cardData.fees}>
            <div className="mt-2 text-sm font-normal text-muted-foreground">
              <span className="text-[hsl(var(--chart-7))]">
                {calculatedValues.feesPercentageOfInvestment} %
              </span>{' '}
              z investované částky
            </div>
          </StatCard>
        </div>
      </div>
    </div>
  );
};
