
import { ReactNode } from 'react';
import SigemSidebar from '@/components/SigemSidebar';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

interface ModuleLayoutProps {
  children: ReactNode;
  requiredRole?: 'gerencia' | 'vendas' | 'recepcao' | 'monitorias' | 'rh';
}

const ModuleLayout = ({ children, requiredRole }: ModuleLayoutProps) => {
  const { user, isAuthenticated } = useAuth();

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
    <div className="flex h-screen overflow-hidden bg-sigem-light-gray dark:bg-gray-900">
      <SigemSidebar />
      <main className="flex-1 overflow-auto p-6 transition-all duration-300">
        <div className="mx-auto max-w-7xl animate-enter">
          {children}
        </div>
      </main>
    </div>
  );
};

export default ModuleLayout;
