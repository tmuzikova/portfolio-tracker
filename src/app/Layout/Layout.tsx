import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from './Header';
import { Footer } from './Footer';
import { Toaster } from '@/components/ui/toaster';

export const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full flex-col">
        <div className="flex-grow">
          <Header />
          <Outlet />
          <Toaster />
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
};
