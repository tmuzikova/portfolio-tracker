import FallbackLogo from '@/assets/fallback_logo.svg?react';
import { useState } from 'react';

export const CompanyLogo = ({
  image,
  companyName,
}: {
  image?: string | null;
  companyName: string;
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className="flex items-center justify-center rounded-full bg-slate-400"
      style={{ width: '7rem', height: '7rem', flexShrink: 0 }}
    >
      {image && !hasError ? (
        <img
          src={image}
          alt={companyName}
          className="h-14 w-14 object-cover md:h-16 md:w-16"
          onError={() => setHasError(true)}
        />
      ) : (
        <FallbackLogo className="h-14 w-14" />
      )}
    </div>
  );
};
