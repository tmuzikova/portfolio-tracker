import { formatNumber } from '@/utils/formatNumber';
import { CardData, StatCard } from './StatCard';
import { Loader as LoaderIcon } from 'lucide-react';
import { useStatCardData } from '@/hooks/useStatData';

export const StatCards = () => {
  const { isLoading, statData, calculatedValues } = useStatCardData();

  const cardData: { [key: string]: CardData } = {
    portfolioValue: {
      value: formatNumber(calculatedValues.portfolioValue),
      tooltip:
        'Hodnota aktuálního portfolia bez realizovaného zisku, poplatků a dividend.',
      title: 'Hodnota portfolia',
    },
    totalValue: {
      value: formatNumber(calculatedValues.totalValue),
      tooltip:
        'Celková hodnota portfolia se započítaným realizovaným ziskem a poplatky.',
      title: 'Celková hodnota portfolia',
    },
    unrealizedProfit: {
      value: formatNumber(statData.unrealizedProfit),
      tooltip:
        'Rozdíl mezi nákupní a současnou cenou aktuálně vlastněných aktiv.',
      title: 'Nerealizovaný zisk',
    },
    realizedProfit: {
      value: formatNumber(statData.realizedProfit),
      tooltip: 'Realizovaný zisk z prodeje aktiv.',
      title: 'Realizovaný zisk',
    },
    investedAmount: {
      value: formatNumber(statData.investedAmount.noFees),
      tooltip: 'Celková investovaná částka bez zahrnutých poplatků.',
      title: 'Investovaná částka',
    },
    dividends: {
      value: formatNumber(statData.dividends),
      tooltip: 'Dividendy počítány dle složení aktuálního portfolia.',
      title: 'Dividendy',
    },
    fees: {
      value: formatNumber(statData.fees),
      tooltip: 'Poplatky za obchodování.',
      title: 'Poplatky',
    },
  };

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <>
      <div className="flex w-full flex-wrap gap-5 lg:flex-nowrap">
        <div className="flex w-full flex-col gap-5">
          <StatCard data={cardData.portfolioValue} className="lg:h-[320px]" />
          <StatCard data={cardData.totalValue} />
        </div>

        <div className="flex w-full flex-col gap-5">
          <StatCard data={cardData.unrealizedProfit}>
            {calculatedValues.unrealizedProfitRelativeToPortfolioValue && (
              <div className="text-[14px] font-normal text-muted-foreground">
                {calculatedValues.unrealizedProfitRelativeToPortfolioValue} % z
                hodnoty portfolia
              </div>
            )}
          </StatCard>

          <StatCard data={cardData.realizedProfit} />
          <StatCard data={cardData.investedAmount} />
        </div>

        <div className="flex w-full flex-col gap-5">
          <StatCard data={cardData.dividends} className="h-[320px]">
            <div className="text-[14px] font-normal text-muted-foreground">
              Dividendový výnos
            </div>
            <div>{calculatedValues.dividendYield} %</div>
            <div className="text-[14px] font-normal text-muted-foreground">
              Dividendový výnos vzhledem k nákladům
            </div>
            <div>{calculatedValues.dividendYieldOnCost} %</div>
            <div className="text-[14px] font-normal text-muted-foreground">
              Predikce na tento rok
            </div>

            <div>{statData.dividends} CZK</div>
          </StatCard>

          <StatCard data={cardData.fees}>
            <div className="text-[14px] font-normal text-muted-foreground">
              {calculatedValues.feesPercentageOfInvestment} % z investované
              částky
            </div>
          </StatCard>
        </div>
      </div>
    </>
  );
};
