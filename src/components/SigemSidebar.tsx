
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Calendar, 
  ClipboardCheck, 
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

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
            icon: LayoutDashboard, 
            path: '/gerencia' 
          },
          { 
            name: 'Vendas', 
            icon: BarChart3, 
            path: '/gerencia/vendas' 
          },
        ];
      case 'vendas':
        return [
          { 
            name: 'Dashboard', 
            icon: LayoutDashboard, 
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
            icon: LayoutDashboard, 
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
            icon: LayoutDashboard, 
            path: '/monitorias' 
          },
          { 
            name: 'Avaliações', 
            icon: ClipboardCheck, 
            path: '/monitorias/avaliacoes' 
          },
        ];
      case 'rh':
        return [
          { 
            name: 'Dashboard', 
            icon: LayoutDashboard, 
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

  // Get initials for avatar
  const getUserInitials = () => {
    if (!user.name || !user.surname) return 'U';
    return `${user.name.charAt(0)}${user.surname.charAt(0)}`.toUpperCase();
  };

  return (
    <div
      className={cn(
        'flex flex-col h-screen bg-gradient-to-b from-sigem-dark-blue to-[#1d2239] text-white transition-all duration-300 border-r border-gray-800',
        collapsed ? 'w-16' : 'w-64',
        className
      )}
    >
      {/* Sidebar Header - Logo and Toggle */}
      <div className="flex items-center justify-between p-4">
        {!collapsed && <div className="text-xl font-bold tracking-tight">{getModuleTitle()}</div>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-white hover:bg-white/10 rounded-full ml-auto"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </Button>
      </div>

      <Separator className="bg-gray-700/50 my-2" />

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2">
        <nav className="space-y-1">
          {moduleItems.map((item) => (
            <TooltipProvider key={item.path} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start text-white/80 hover:text-white hover:bg-white/10 transition-all',
                      location.pathname === item.path ? 'bg-white/15 text-white font-medium' : '',
                      collapsed ? 'px-3' : 'px-4'
                    )}
                    onClick={() => navigate(item.path)}
                  >
                    <item.icon className={cn('h-5 w-5', collapsed ? '' : 'mr-3')} />
                    {!collapsed && <span>{item.name}</span>}
                  </Button>
                </TooltipTrigger>
                {collapsed && (
                  <TooltipContent side="right" className="bg-gray-900 text-white border-gray-800">
                    {item.name}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
      </div>

      {/* User Profile Section */}
      <div className="p-3 border-t border-gray-700/50">
        <div className="flex items-center mb-2">
          <Avatar className="h-8 w-8 bg-primary text-white">
            <AvatarFallback>{getUserInitials()}</AvatarFallback>
          </Avatar>
          {!collapsed && (
            <div className="ml-3 overflow-hidden">
              <p className="text-sm font-medium truncate">{user.name} {user.surname}</p>
              <p className="text-xs text-white/70 truncate">{getModuleTitle()}</p>
            </div>
          )}
        </div>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start text-white/80 hover:text-white hover:bg-white/10 mt-1',
                  collapsed ? 'px-3' : 'px-4'
                )}
                onClick={logout}
              >
                <LogOut className={cn('h-5 w-5', collapsed ? '' : 'mr-3')} />
                {!collapsed && <span>Sair</span>}
              </Button>
            </TooltipTrigger>
            {collapsed && (
              <TooltipContent side="right" className="bg-gray-900 text-white border-gray-800">
                Sair
              </TooltipContent>
            )}
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default SigemSidebar;
