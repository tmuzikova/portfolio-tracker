import { PanelLeft as PanelLeftIcon, Plus as PlusIcon } from 'lucide-react';
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
import clsx from 'clsx';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { SidebarItem } from './AppSidebar';

type props = {
  items: SidebarItem[];
};

export const DesktopSidebar = ({ items }: props) => {
  const location = useLocation();
  const { setOpen } = useSidebar();

  const collapsedClasses = {
    trigger:
      'group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0',
    button:
      'group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:!gap-0',
    link: 'group-data-[state=collapsed]:!px-6 group-data-[state=collapsed]:!py-6',
    group: 'group-data-[state=collapsed]:!px-0',
    content: 'group-data-[state=collapsed]:!px-2',
  };

  const triggerIcon = <PanelLeftIcon />;

  return (
    <Sidebar collapsible="icon" side="left" variant="sidebar">
      <span className="flex">
        <SidebarTrigger
          customIcon={triggerIcon}
          className={clsx(
            'flex w-full items-center justify-end py-6 pr-3 hover:bg-transparent',
            collapsedClasses.trigger,
          )}
        />
      </span>
      <SidebarContent
        className={clsx('mt-6 py-[72px]', collapsedClasses.content)}
      >
        <SidebarGroup className={clsx(collapsedClasses.group)}>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={location.pathname === item.url}
                    className={clsx(collapsedClasses.button)}
                    onClick={() => setOpen(false)}
                  >
                    <Link
                      to={item.url}
                      className={clsx('py-6 pl-4', collapsedClasses.link)}
                    >
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
                  className={clsx(
                    'mt-6 bg-[hsl(var(--sidebar-primary))] py-6 pl-4 text-[hsl(var(--sidebar-primary-foreground))] transition-colors hover:bg-[hsl(var(--sidebar-primary))] hover:text-[hsl(var(--sidebar-primary-foreground))]',
                    collapsedClasses.button,
                    collapsedClasses.link,
                  )}
                  onClick={() => setOpen(false)}
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
