import { HistoricalDividendDataWithLastUpdated } from '@/types/historicalDividends';
import { getLastTuesday } from './getLastTuesday';

export const isDividendDataStale = (
  dbData: HistoricalDividendDataWithLastUpdated | null,
): boolean => {
  const lastTuesday = new Date(getLastTuesday());
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const isDividendDataMissing = !dbData || !dbData.lastUpdated;
  const isStaleNonDividendData =
    dbData?.hasDividends === false &&
    dbData.lastUpdated &&
    new Date(dbData.lastUpdated) < sixMonthsAgo;
  const isStaleDividendData =
    dbData?.lastUpdated && new Date(dbData.lastUpdated) < lastTuesday;

  if (isDividendDataMissing || isStaleNonDividendData || isStaleDividendData) {
    return true;
  }
  return false;
};
