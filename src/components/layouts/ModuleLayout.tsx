
import { ReactNode, useEffect } from 'react';
import SigemSidebar from '@/components/SigemSidebar';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { MoonIcon, SunIcon } from 'lucide-react';
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

  const getUserInitials = () => {
    if (!user?.name || !user?.surname) return 'U';
    return `${user.name.charAt(0)}${user.surname.charAt(0)}`.toUpperCase();
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <SigemSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 border-b bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 shadow-sm flex items-center justify-between px-6">
          <div>
            <h2 className="text-lg font-medium text-gray-800 dark:text-gray-200">
              {new Date().toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Tenha um ótimo dia!</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="rounded-full">
              <SunIcon className="h-5 w-5 rotate-0 scale-100 transition-all dark:rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Alternar tema</span>
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <Avatar className="h-10 w-10 border-2 border-indigo-400/30 bg-indigo-900/30 text-white shadow-lg">
                    <AvatarFallback className="bg-sigem-indigo/20 text-sigem-indigo">
                      {getUserInitials()}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium leading-none">{user?.name} {user?.surname}</p>
                  <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Perfil
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Configurações
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer text-red-500" onClick={logout}>
                  Sair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>
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
