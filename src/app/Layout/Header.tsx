import { SidebarTrigger } from '@/components/ui/sidebar';
import { MenuIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Header = () => {
  return (
    <div className="bg-[hsl(var(--sidebar-accent))] py-5">
      <header className="flex flex-row justify-between px-4 text-[32px] font-bold text-[hsl(var(--sidebar-primary))]">
        <Link to="/" className="whitespace-nowrap">
          portfolio tracker
        </Link>
        <SidebarTrigger
          customIcon={<MenuIcon />}
          className="py-6 pr-3 hover:bg-transparent md:hidden"
        />
      </header>
    </div>
  );
};
