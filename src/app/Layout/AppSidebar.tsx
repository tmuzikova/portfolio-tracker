import { Home, Plus, Receipt } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import { useLocation } from 'react-router-dom';
import clsx from 'clsx';
const items = [
  {
    title: 'Přehled',
    url: '/',
    icon: Home,
  },
  {
    title: 'Transakce',
    url: '/transaction-table',
    icon: Receipt,
  },
];

export const AppSidebar = () => {
  const location = useLocation();

  const collapsedClasses = {
    trigger:
      'group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0',
    button:
      'group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:!gap-0',
    link: 'group-data-[state=collapsed]:!px-6 group-data-[state=collapsed]:!py-6',
    group: 'group-data-[state=collapsed]:!px-0',
    content: 'group-data-[state=collapsed]:!px-2',
    header: 'group-data-[state=collapsed]:hidden ',
  };

  return (
    <Sidebar collapsible="icon">
      <span className="flex">
        <SidebarTrigger
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
                  >
                    <a
                      href={item.url}
                      className={clsx('py-6 pl-4', collapsedClasses.link)}
                    >
                      <span>
                        <item.icon />
                      </span>
                      <span className="text-[16px]">{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuButton
                className={clsx(
                  'mt-6 bg-[hsl(var(--sidebar-primary))] py-6 pl-4 text-[hsl(var(--sidebar-primary-foreground))] transition-colors hover:bg-[hsl(var(--sidebar-primary))] hover:text-[hsl(var(--sidebar-primary-foreground))]',
                  collapsedClasses.button,
                  collapsedClasses.link,
                )}
              >
                <span>
                  <Plus />
                </span>
                <span className="text-[16px]">Přidat transakci</span>
              </SidebarMenuButton>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className={clsx(collapsedClasses.header)}>
        footer
      </SidebarFooter>
    </Sidebar>
  );
};
