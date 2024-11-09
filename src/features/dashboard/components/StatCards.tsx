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

  return (
    <>
      <div className="flex flex-col gap-5">
        <StatCard
          title="Hodnota portfolia"
          tooltip="Hodnota aktuálního portfolia bez realizovaného zisku, poplatků a dividend."
          className="h-[320px]"
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
      <div className="flex flex-col gap-5">
        <StatCard
          title="Nerealizovaný zisk"
          tooltip="Rozdíl mezi nákupní a současnou cenou aktuálně vlastněných aktiv."
        >
          {data.unrealizedProfit} CZK
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
      <div className="flex flex-col gap-5">
        <StatCard title="Dividendy" className="h-[320px]">
          {data.dividends} CZK
        </StatCard>
        <StatCard title="Poplatky">{data.fees} CZK</StatCard>
      </div>
    </>
  );
};
