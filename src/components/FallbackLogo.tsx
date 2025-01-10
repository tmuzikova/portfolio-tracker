import { FC, SVGProps } from 'react';
import FallbackLogoSvg from '@/assets/fallback_logo.svg';

export const FallbackLogo: FC<SVGProps<SVGSVGElement>> = (props) => (
  <FallbackLogoSvg {...props} />
);
