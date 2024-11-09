import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Navbar } from './Navbar';

export const Layout = () => {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full">
          <Navbar />
          <Outlet />
        </main>
      </SidebarProvider>
    </>
  );
};
