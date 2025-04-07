
import { ReactNode, useEffect } from 'react';
import SigemSidebar from '@/components/SigemSidebar';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

interface ModuleLayoutProps {
  children: ReactNode;
  requiredRole?: 'gerencia' | 'vendas' | 'recepcao' | 'monitorias' | 'rh';
}

const ModuleLayout = ({ children, requiredRole }: ModuleLayoutProps) => {
  const { user, isAuthenticated, logout } = useAuth();

  // If user is not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  // If a specific role is required, check if user has that role
  if (requiredRole && user?.role !== requiredRole) {
    // Redirect to their actual module
    return <Navigate to={`/${user?.role}`} />;
  }

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <SigemSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-auto p-6 transition-all duration-300">
          <div className="mx-auto max-w-7xl">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default ModuleLayout;
