import { SidebarTrigger } from '@/components/ui/sidebar';
import { ChartNoAxesCombined, MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="bg-[hsl(var(--sidebar-accent))] py-5">
      <header className="flex flex-row justify-between px-4 text-[38px] font-bold tracking-wider text-[hsl(var(--sidebar-primary))]">
        <Link
          to="/"
          className="flex flex-row items-center gap-2 whitespace-nowrap"
        >
          <ChartNoAxesCombined className="h-[38px] w-[38px]" />
          Trackfolio
        </Link>

        <SidebarTrigger
          customIcon={<MenuIcon />}
          className="py-6 pr-3 hover:bg-transparent md:hidden"
        />
      </header>
    </div>
  );
};
