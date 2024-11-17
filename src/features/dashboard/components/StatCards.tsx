import { CardData, StatCard } from './StatCard';

export const StatCards = () => {
  //to be replaced with real data
  const data = {
    portfolioValue: 1000000,
    totalValue: 1200000,
    unrealizedProfit: 300000,
    realizedProfit: 200000,
    investedAmount: 500000,
    dividends: 150000,
    fees: 1300,
  };

  const cardData: { [key: string]: CardData } = {
    portfolioValue: {
      value: data.portfolioValue,
      tooltip:
        'Hodnota aktuálního portfolia bez realizovaného zisku, poplatků a dividend.',
      title: 'Hodnota portfolia',
    },
    totalValue: {
      value: data.totalValue,
      tooltip:
        'Celková hodnota portfolia se započítaným realizovaným ziskem a poplatky.',
      title: 'Celková hodnota portfolia',
    },
    unrealizedProfit: {
      value: data.unrealizedProfit,
      tooltip:
        'Rozdíl mezi nákupní a současnou cenou aktuálně vlastněných aktiv.',
      title: 'Nerealizovaný zisk',
    },
    realizedProfit: {
      value: data.realizedProfit,
      tooltip: 'Realizovaný zisk z prodeje aktiv.',
      title: 'Realizovaný zisk',
    },
    investedAmount: {
      value: data.investedAmount,
      tooltip: 'Celková investovaná částka bez započítaných poplatků.',
      title: 'Investovaná částka',
    },
    dividends: {
      value: data.dividends,
      tooltip: 'Dividendy počítány dle složení aktuálního portfolia.',
      title: 'Dividendy',
    },
    fees: {
      value: data.fees,
      tooltip: 'Poplatky za obchodování.',
      title: 'Poplatky',
    },
  };

  const unrealizedProfitPercentage = (
    (data.unrealizedProfit / data.portfolioValue) *
    100
  ).toFixed(2);

  const dividendYield = ((data.dividends / data.portfolioValue) * 100).toFixed(
    2,
  );

  const dividendYieldOnCost = (
    (data.dividends / data.investedAmount) *
    100
  ).toFixed(2);
  const feesPercentageOfInvestment = (
    (data.fees / data.investedAmount) *
    100
  ).toFixed(2);

  return (
    <>
      <div className="flex w-full flex-wrap gap-5 lg:flex-nowrap">
        <div className="flex w-full flex-col gap-5">
          <StatCard data={cardData.portfolioValue} className="lg:h-[320px]" />
          <StatCard data={cardData.totalValue} />
        </div>

        <div className="flex w-full flex-col gap-5">
          <StatCard data={cardData.unrealizedProfit}>
            <div className="text-[14px] font-normal text-muted-foreground">
              {unrealizedProfitPercentage} % z hodnoty portfolia
            </div>
          </StatCard>

          <StatCard data={cardData.realizedProfit} />
          <StatCard data={cardData.investedAmount} />
        </div>

        <div className="flex w-full flex-col gap-5">
          <StatCard data={cardData.dividends} className="h-[320px]">
            <div className="text-[14px] font-normal text-muted-foreground">
              Dividendový výnos
            </div>
            <div>{dividendYield} %</div>
            <div className="text-[14px] font-normal text-muted-foreground">
              Dividendový výnos vzhledem k nákladům
            </div>
            <div>{dividendYieldOnCost} %</div>
            <div className="text-[14px] font-normal text-muted-foreground">
              Predikce na tento rok
            </div>

            <div>{data.dividends} CZK</div>
          </StatCard>

          <StatCard data={cardData.fees}>
            <div className="text-[14px] font-normal text-muted-foreground">
              {feesPercentageOfInvestment} % z investované částky
            </div>
          </StatCard>
        </div>
      </div>
    </>
  );
};
