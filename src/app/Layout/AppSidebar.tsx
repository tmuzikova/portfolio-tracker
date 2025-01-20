import {
  Home as HomeIcon,
  PanelLeft as PanelLeftIcon,
  Plus as PlusIcon,
  Receipt as ReceiptIcon,
  X as XIcon,
} from 'lucide-react';

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
const items = [
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
  const location = useLocation();
  const { isMobile, openMobile, setOpenMobile, setOpen } = useSidebar();

  const collapsedClasses = {
    trigger:
      'group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:px-0',
    button:
      'group-data-[state=collapsed]:justify-center group-data-[state=collapsed]:!gap-0',
    link: 'group-data-[state=collapsed]:!px-6 group-data-[state=collapsed]:!py-6',
    group: 'group-data-[state=collapsed]:!px-0',
    content: 'group-data-[state=collapsed]:!px-2',
  };

  const triggerIcon = isMobile && openMobile ? <XIcon /> : <PanelLeftIcon />;

  return (
    <Sidebar
      collapsible="icon"
      side={isMobile ? 'right' : 'left'}
      variant="sidebar"
    >
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
                    className={clsx(
                      collapsedClasses.button,
                      isMobile && 'mb-2',
                    )}
                    onClick={() => {
                      if (isMobile) {
                        setOpenMobile(false);
                      } else {
                        setOpen(false);
                      }
                    }}
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
                  onClick={() => {
                    if (isMobile) {
                      setOpenMobile(false);
                    } else {
                      setOpen(false);
                    }
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
