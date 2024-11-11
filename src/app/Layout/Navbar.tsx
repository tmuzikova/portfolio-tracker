import { NavigationMenu } from '@/components/ui/navigation-menu';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  return (
    <div className="bg-[hsl(var(--sidebar-accent))] py-5">
      <NavigationMenu className="px-4 text-[32px] font-bold text-[hsl(var(--sidebar-primary))]">
        <Link to="/">portfolio tracker</Link>
      </NavigationMenu>
    </div>
  );
};
