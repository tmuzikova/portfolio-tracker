import { NavigationMenu } from '@/components/ui/navigation-menu';

export const Navbar = () => {
  return (
    <div className="bg-[hsl(var(--sidebar-accent))] py-5">
      <NavigationMenu className="px-16 text-[32px] font-bold text-[hsl(var(--sidebar-primary))]">
        portfolio tracker
      </NavigationMenu>
    </div>
  );
};
