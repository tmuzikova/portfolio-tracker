import { formatNumber } from '@/utils/formatNumber';
import { CardData, StatCard } from './StatCard';
import { useTransactionStore } from '@/stores/TransactionStore';
import { getSavedTransactions } from '@/utils/getSavedTransactions';
import { calculateInvestedAmount } from '@/utils/portfolioCalculations/calculateInvestedAmount';
import { calculateTotalFees } from '@/utils/portfolioCalculations/calculateFees';
import { calculateRealizedProfit } from '@/utils/portfolioCalculations/calculateRealizedProfit';
import { getCurrentPortfolio } from '@/utils/portfolioCalculations/getCurrentPortfolio';
import { useHistoricalStockPrices } from '@/hooks/useHistoricalStockPrices';

export const StatCards = () => {
  const savedTransactions = getSavedTransactions();
  const existingTransactions = useTransactionStore(
    (state) => state.transactions,
  );

  const currentPortfolio = getCurrentPortfolio({
    existingTransactions,
    savedTransactions,
  });

  const { data, isLoading, error } = useHistoricalStockPrices(currentPortfolio);

  const statData = {
    unrealizedProfit: 300000,
    realizedProfit: calculateRealizedProfit({
      existingTransactions,
      savedTransactions,
    }),
    investedAmount: calculateInvestedAmount({
      existingTransactions,
      savedTransactions,
    }),
    dividends: 150000,
    fees: calculateTotalFees({
      existingTransactions,
      savedTransactions,
    }),
  };

  const portfolioValue =
    statData.unrealizedProfit + statData.investedAmount.noFees;
  const totalValue = statData.realizedProfit + portfolioValue - statData.fees;
  const unrealizedProfitPercentage = (
    (statData.unrealizedProfit / portfolioValue) *
    100
  ).toFixed(2);
  const dividendYield = ((statData.dividends / portfolioValue) * 100).toFixed(
    2,
  );
  const dividendYieldOnCost = (
    (statData.dividends / statData.investedAmount.withFees) *
    100
  ).toFixed(2);
  const feesPercentageOfInvestment = (
    (statData.fees / statData.investedAmount.withFees) *
    100
  ).toFixed(2);

  const cardData: { [key: string]: CardData } = {
    portfolioValue: {
      value: formatNumber(portfolioValue),
      tooltip:
        'Hodnota aktuálního portfolia bez realizovaného zisku, poplatků a dividend.',
      title: 'Hodnota portfolia',
    },
    totalValue: {
      value: formatNumber(totalValue),
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

            <div>{statData.dividends} CZK</div>
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
