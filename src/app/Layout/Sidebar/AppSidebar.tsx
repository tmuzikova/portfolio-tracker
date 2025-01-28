import { useSidebar } from '@/components/ui/sidebar';
import { MobileSidebar } from './MobileSidebar';
import { DesktopSidebar } from './DesktopSidebar';
import { Home as HomeIcon, Receipt as ReceiptIcon } from 'lucide-react';

export type SidebarItem = {
  title: string;
  url: string;
  icon: React.ElementType;
};

const items: SidebarItem[] = [
  {
    title: 'Přehled',
    url: '/',
    icon: HomeIcon,
  },
  {
    title: 'Transakce',
    url: '/transaction-table',
    icon: ReceiptIcon,
  },
];

export const AppSidebar = () => {
  const { isMobile } = useSidebar();

  return isMobile ? (
    <MobileSidebar items={items} />
  ) : (
    <DesktopSidebar items={items} />
  );
};
