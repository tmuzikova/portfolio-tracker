import { StatCard } from './StatCard';

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
          <StatCard
            title="Hodnota portfolia"
            tooltip="Hodnota aktuálního portfolia bez realizovaného zisku, poplatků a dividend."
            className="lg:h-[320px]"
          >
            {data.portfolioValue} CZK
          </StatCard>

          <StatCard
            title="Celková hodnota portfolia"
            tooltip="Celková hodnota portfolia se započítaným realizovaným ziskem a poplatky."
          >
            {data.totalValue} CZK
          </StatCard>
        </div>

        <div className="flex w-full flex-col gap-5">
          <StatCard
            title="Nerealizovaný zisk"
            tooltip="Rozdíl mezi nákupní a současnou cenou aktuálně vlastněných aktiv."
          >
            {data.unrealizedProfit} CZK
            <div className="text-[14px] font-normal text-muted-foreground">
              {unrealizedProfitPercentage} % z hodnoty portfolia
            </div>
          </StatCard>

          <StatCard
            title="Realizovaný zisk"
            tooltip="Realizovaný zisk z prodeje aktiv."
          >
            {data.realizedProfit} CZK
          </StatCard>

          <StatCard
            title="Investovaná částka"
            tooltip="Celková investovaná částka bez započítaných poplatků."
          >
            {data.investedAmount} CZK
          </StatCard>
        </div>

        <div className="flex w-full flex-col gap-5">
          <StatCard
            title="Dividendy"
            className="h-[320px]"
            tooltip="Dividendy počítány dle složení aktuálního portfolia."
          >
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

          <StatCard title="Poplatky" className="flex flex-col">
            <div>{data.fees} CZK</div>
            <div className="text-[14px] font-normal text-muted-foreground">
              {feesPercentageOfInvestment} % z investované částky
            </div>
          </StatCard>
        </div>
      </div>
    </>
  );
};
