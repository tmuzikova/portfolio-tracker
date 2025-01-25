import { sectorsTranslation } from '@/utils/sectorsIndustryTranslation';
import { Accumulator } from '../types/accumulator';
import { CurrentPortfolioItemWithPriceData } from '@/types/currentPortfolio';

export const groupBySector = (
  currentPortfolio: CurrentPortfolioItemWithPriceData[],
  totalPortfolioValue: number,
) => {
  return currentPortfolio.reduce<Accumulator>((acc, item) => {
    const sector = item.sector || '';
    const translatedSector = sectorsTranslation[sector] || 'Nezařazeno';
    const portfolioShare =
      (item.currentValue.total / totalPortfolioValue) * 100;

    return {
      ...acc,
      [translatedSector]: acc[translatedSector]
        ? {
            ...acc[translatedSector],
            portfolioShare:
              acc[translatedSector].portfolioShare + portfolioShare,
          }
        : {
            groupProperty: translatedSector,
            portfolioShare,
            fill: '',
          },
    };
  }, {});
};
