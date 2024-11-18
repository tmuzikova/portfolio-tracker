import { Outlet } from 'react-router-dom';
import { AppSidebar } from './AppSidebar';
import { SidebarProvider } from '@/components/ui/sidebar';
import { Header } from './Header';
import { Footer } from './Footer';

export const Layout = () => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex w-full flex-col">
        <div className="flex-grow">
          <Header />
          <Outlet />
        </div>
        <Footer />
      </main>
    </SidebarProvider>
  );
};
