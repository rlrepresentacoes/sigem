
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Home, Users, Calendar, BarChart, ClipboardList } from 'lucide-react';

interface SidebarProps {
  className?: string;
}

const SigemSidebar = ({ className }: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  if (!user) return null;

  // Define module navigation items based on user role
  const getModuleItems = () => {
    switch (user.role) {
      case 'gerencia':
        return [
          { 
            name: 'Dashboard', 
            icon: Home, 
            path: '/gerencia' 
          },
          { 
            name: 'Vendas', 
            icon: BarChart, 
            path: '/gerencia/vendas' 
          },
        ];
      case 'vendas':
        return [
          { 
            name: 'Dashboard', 
            icon: Home, 
            path: '/vendas' 
          },
          { 
            name: 'Clientes', 
            icon: Users, 
            path: '/vendas/clientes' 
          },
        ];
      case 'recepcao':
        return [
          { 
            name: 'Dashboard', 
            icon: Home, 
            path: '/recepcao' 
          },
          { 
            name: 'Visitas', 
            icon: Calendar, 
            path: '/recepcao/visitas' 
          },
        ];
      case 'monitorias':
        return [
          { 
            name: 'Dashboard', 
            icon: Home, 
            path: '/monitorias' 
          },
          { 
            name: 'Avaliações', 
            icon: ClipboardList, 
            path: '/monitorias/avaliacoes' 
          },
        ];
      case 'rh':
        return [
          { 
            name: 'Dashboard', 
            icon: Home, 
            path: '/rh' 
          },
          { 
            name: 'Funcionários', 
            icon: Users, 
            path: '/rh/funcionarios' 
          },
        ];
      default:
        return [];
    }
  };

  const moduleItems = getModuleItems();

  // Get module title
  const getModuleTitle = () => {
    switch (user.role) {
      case 'gerencia': return 'Gerência';
      case 'vendas': return 'Vendas';
      case 'recepcao': return 'Recepção';
      case 'monitorias': return 'Monitorias';
      case 'rh': return 'RH';
      default: return 'SIGEM';
    }
  };

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-sigem-dark-blue text-white transition-all duration-300',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Sidebar Header - Logo and Toggle */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        {!collapsed && <div className="text-xl font-bold">{getModuleTitle()}</div>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-gray-700 ml-auto"
        >
          {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </Button>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {moduleItems.map((item) => (
            <Button
              key={item.path}
              variant="ghost"
              className={cn(
                'w-full justify-start text-white hover:bg-gray-700 hover:text-white',
                location.pathname === item.path ? 'bg-gray-700' : '',
                collapsed ? 'px-3' : 'px-4'
              )}
              onClick={() => navigate(item.path)}
            >
              <item.icon className={cn('h-5 w-5', collapsed ? '' : 'mr-3')} />
              {!collapsed && <span>{item.name}</span>}
            </Button>
          ))}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-t border-gray-700">
        {!collapsed && (
          <div className="mb-2">
            <p className="text-sm font-semibold">{user.name} {user.surname}</p>
            <p className="text-xs opacity-75">{getModuleTitle()}</p>
          </div>
        )}
        <Button
          variant="ghost"
          className={cn(
            'w-full justify-start text-white hover:bg-gray-700 hover:text-white',
            collapsed ? 'px-3' : 'px-4'
          )}
          onClick={logout}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className={cn('h-5 w-5', collapsed ? '' : 'mr-3')} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          {!collapsed && <span>Sair</span>}
        </Button>
      </div>
    </div>
  );
};

export default SigemSidebar;
