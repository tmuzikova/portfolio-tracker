import { useParams } from 'react-router-dom';
import { StockPriceDevelopmentChart } from '../components/StockPriceDevelopmentChart';
import { useStockCardData } from '@/hooks/useStockCardData';
import { Loader as LoaderIcon } from 'lucide-react';

export const StockCard = () => {
  const { symbol } = useParams<{ symbol: string }>();

  if (!symbol) {
    return <div>Chyba: chybějící symbol</div>;
  }

  const { percentageDifference, absoluteDifference, latestPrice, isLoading } =
    useStockCardData(symbol);

  if (isLoading) {
    return (
      <div className="flex h-64 w-full items-center justify-center">
        <LoaderIcon className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  return (
    <section className="container mx-auto px-4 pb-12">
      <section>
        <div className="flex flex-row justify-between py-6">
          <div className="flex flex-row gap-5">
            <div
              className="flex items-center justify-center rounded-full bg-gray-600"
              style={{ width: '5rem', height: '5rem', flexShrink: 0 }}
            ></div>
            <div className="flex flex-col justify-between">
              <h1 className="text-[34px] font-semibold">{symbol}</h1>
              <h2>Název | Burza</h2>
            </div>
          </div>
          <div className="flex flex-row items-center gap-5">
            <p className="text-[34px] font-semibold">
              ${latestPrice.toFixed(2)}
            </p>

            <div className={`flex flex-col items-end`}>
              <div
                className={`${
                  absoluteDifference < 0 ? 'text-red-500' : 'text-green-500'
                } flex flex-row items-center gap-2`}
              >
                <p className="text-[20px] font-semibold">
                  {absoluteDifference < 0
                    ? `-$${Math.abs(absoluteDifference).toFixed(2)}`
                    : `+$${absoluteDifference.toFixed(2)}`}
                </p>
                <p className="text-[16px]">
                  {percentageDifference > 0
                    ? `(+${percentageDifference.toFixed(2)} %)`
                    : `(${percentageDifference.toFixed(2)} %)`}
                </p>
              </div>
              <p>za posledních 30 dní</p>
            </div>
          </div>
        </div>
      </section>

      <section>
        <StockPriceDevelopmentChart />
      </section>
    </section>
  );
};
