import { Menu as MenuIcon, Plus as PlusIcon, X as XIcon } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { SidebarItem } from './AppSidebar';

type props = {
  items: SidebarItem[];
};

export const MobileSidebar = ({ items }: props) => {
  const location = useLocation();
  const { openMobile, setOpenMobile } = useSidebar();

  const triggerIcon = openMobile ? <XIcon /> : <MenuIcon />;

  return (
    <Sidebar side="right" variant="sidebar">
      <span className="flex">
        <SidebarTrigger
          customIcon={triggerIcon}
          className="flex w-full items-center justify-end py-6 pr-3 hover:bg-transparent"
        />
      </span>
      <SidebarContent className="mt-6 py-[72px]">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className="mb-2"
                    onClick={() => {
                      setOpenMobile(false);
                    }}
                  >
                    <Link to={item.url} className="py-6 pl-4">
                      <span>
                        <item.icon />
                      </span>
                      <span className="text-[16px]">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}

              <AddTransactionModal>
                <SidebarMenuButton
                  className="mt-6 bg-[hsl(var(--sidebar-primary))] py-6 pl-4 text-[hsl(var(--sidebar-primary-foreground))] transition-colors hover:bg-[hsl(var(--sidebar-primary))] hover:text-[hsl(var(--sidebar-primary-foreground))]"
                  onClick={() => {
                    setOpenMobile(false);
                  }}
                >
                  <span>
                    <PlusIcon />
                  </span>
                  <span className="text-[16px]">Přidat transakci</span>
                </SidebarMenuButton>
              </AddTransactionModal>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
