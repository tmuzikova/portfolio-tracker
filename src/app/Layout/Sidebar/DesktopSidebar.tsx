import {
  ChevronUp as ChevronUpIcon,
  PanelLeft as PanelLeftIcon,
  Plus as PlusIcon,
  User2 as UserIcon,
} from 'lucide-react';
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
  useSidebar,
} from '@/components/ui/sidebar';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import { AddTransactionModal } from '@/components/AddTransactionModal';
import { SidebarItem } from './AppSidebar';
import { useAuth } from '@/providers/AuthContextProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useAuthUserData } from '@/hooks/useAuthUserData';

type props = {
  items: SidebarItem[];
};

export const DesktopSidebar = ({ items }: props) => {
  const location = useLocation();
  const { signOut } = useAuth();
  const { setOpen, state } = useSidebar();
  const { userName, userPhoto, userEmail } = useAuthUserData();

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

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem className="group-data-[state=collapsed]:!px-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="group-data-[state=collapsed]:!py-6"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userPhoto || undefined} />
                    <AvatarFallback>
                      <UserIcon className="h-6 w-6" />
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex flex-col items-start gap-0.5">
                    <span className="text-sm font-medium">{userName}</span>
                    <span className="text-xs text-muted-foreground">
                      {userEmail}
                    </span>
                  </div>
                  <ChevronUpIcon className="ml-auto h-4 w-4" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side={state === 'expanded' ? 'top' : 'right'}
                sideOffset={15}
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem onClick={signOut}>
                  <span className="text-[16px]">Odhlásit se</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};
