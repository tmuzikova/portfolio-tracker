import {
  Menu as MenuIcon,
  Plus as PlusIcon,
  X as XIcon,
  User2 as UserIcon,
  ChevronUp as ChevronUpIcon,
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

type props = {
  items: SidebarItem[];
};

export const MobileSidebar = ({ items }: props) => {
  const location = useLocation();
  const { openMobile, setOpenMobile } = useSidebar();
  const { session, signOut } = useAuth();

  const triggerIcon = openMobile ? <XIcon /> : <MenuIcon />;

  const user = session?.user;
  const userName = user?.user_metadata?.full_name || 'Neznámý uživatel';
  const userPhoto = user?.user_metadata?.avatar_url || null;
  const userEmail = user?.email || null;

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
                <SidebarMenuButton className="mt-6 bg-[hsl(var(--sidebar-primary))] py-6 pl-4 text-[hsl(var(--sidebar-primary-foreground))] transition-colors hover:bg-[hsl(var(--sidebar-primary))] hover:text-[hsl(var(--sidebar-primary-foreground))]">
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
                    <AvatarImage src={userPhoto} />
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
                side="top"
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
