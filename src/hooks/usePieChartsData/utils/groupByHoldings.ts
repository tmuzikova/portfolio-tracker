import { CurrentPortfolioItem } from '@/types/currentPortfolio';
import { Accumulator } from '../types/accumulator';

export const groupByHoldings = (
  currentPortfolio: CurrentPortfolioItem[],
  totalPortfolioValue: number,
) =>
  currentPortfolio.reduce<Accumulator>((acc, item) => {
    const portfolioShare = (item.value.total / totalPortfolioValue) * 100;

    return {
      ...acc,
      [item.holding.holdingSymbol]: acc[item.holding.holdingSymbol]
        ? {
            ...acc[item.holding.holdingSymbol],
            portfolioShare:
              acc[item.holding.holdingSymbol].portfolioShare + portfolioShare,
          }
        : {
            groupProperty: item.holding.holdingSymbol,
            holdingName: item.holding.holdingName,
            portfolioShare,
            fill: '',
          },
    };
  }, {});
