import { Accumulator } from '../types/accumulator';
import { CurrentPortfolioItem } from '@/types/currentPortfolio';

export const groupByType = (
  currentPortfolio: CurrentPortfolioItem[],
  totalPortfolioValue: number,
) => {
  return currentPortfolio.reduce<Accumulator>((acc, item) => {
    const type = item.type.isEtf ? 'ETF' : item.type.isFund ? 'Fond' : 'Akcie';
    const portfolioShare = (item.value.total / totalPortfolioValue) * 100;

    return {
      ...acc,
      [type]: acc[type]
        ? {
            ...acc[type],
            portfolioShare: acc[type].portfolioShare + portfolioShare,
          }
        : {
            groupProperty: type,
            portfolioShare,
            fill: '',
          },
    };
  }, {});
};
