export const PriceDifference = ({
  absoluteDifference,
  percentageDifference,
}: {
  absoluteDifference: number;
  percentageDifference: number;
}) => {
  const isNegative = absoluteDifference < 0 || percentageDifference < 0;
  const absoluteDiff = Math.abs(absoluteDifference ?? 0).toFixed(2);
  const percentageDiff = percentageDifference?.toFixed(2);

  return (
    <div
      className={`${isNegative ? 'text-red-500' : 'text-green-500'} flex flex-row items-center gap-2`}
    >
      <p className="text-lg font-semibold md:text-xl">
        {isNegative ? `-$${absoluteDiff}` : `+$${absoluteDiff}`}
      </p>
      <p className="text-sm md:text-base">
        {isNegative ? `(${percentageDiff} %)` : `(+${percentageDiff} %)`}
      </p>
    </div>
  );
};
