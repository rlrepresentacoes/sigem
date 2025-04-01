import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Calendar, ClipboardCheck, LogOut, ChevronLeft, ChevronRight, PieChart, Settings, Bell } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Badge } from "@/components/ui/badge";
interface SidebarProps {
  className?: string;
}
const SigemSidebar = ({
  className
}: SidebarProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    user,
    logout
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!user) return null;

  // Define module navigation items based on user role
  const getModuleItems = () => {
    switch (user.role) {
      case 'gerencia':
        return [{
          name: 'Dashboard',
          icon: LayoutDashboard,
          path: '/gerencia',
          description: 'Visão geral do sistema'
        }, {
          name: 'Vendas',
          icon: BarChart3,
          path: '/gerencia/vendas',
          description: 'Relatórios de vendas'
        }];
      case 'vendas':
        return [{
          name: 'Dashboard',
          icon: LayoutDashboard,
          path: '/vendas',
          description: 'Visão geral de vendas',
          badge: '3'
        }, {
          name: 'Clientes',
          icon: Users,
          path: '/vendas/clientes',
          description: 'Gerenciamento de clientes'
        }, {
          name: 'Análises',
          icon: PieChart,
          path: '/vendas/analises',
          description: 'Métricas e gráficos',
          new: true
        }];
      case 'recepcao':
        return [{
          name: 'Dashboard',
          icon: LayoutDashboard,
          path: '/recepcao',
          description: 'Visão geral da recepção'
        }, {
          name: 'Visitas',
          icon: Calendar,
          path: '/recepcao/visitas',
          description: 'Agenda de visitas'
        }];
      case 'monitorias':
        return [{
          name: 'Dashboard',
          icon: LayoutDashboard,
          path: '/monitorias',
          description: 'Visão geral de monitorias'
        }, {
          name: 'Avaliações',
          icon: ClipboardCheck,
          path: '/monitorias/avaliacoes',
          description: 'Avaliações de desempenho'
        }];
      case 'rh':
        return [{
          name: 'Dashboard',
          icon: LayoutDashboard,
          path: '/rh',
          description: 'Visão geral de RH'
        }, {
          name: 'Funcionários',
          icon: Users,
          path: '/rh/funcionarios',
          description: 'Gerenciamento de funcionários'
        }];
      default:
        return [];
    }
  };
  const moduleItems = getModuleItems();

  // Get module title
  const getModuleTitle = () => {
    switch (user.role) {
      case 'gerencia':
        return 'Gerência';
      case 'vendas':
        return 'Vendas';
      case 'recepcao':
        return 'Recepção';
      case 'monitorias':
        return 'Monitorias';
      case 'rh':
        return 'RH';
      default:
        return 'SIGEM';
    }
  };

  // Get initials for avatar
  const getUserInitials = () => {
    if (!user.name || !user.surname) return 'U';
    return `${user.name.charAt(0)}${user.surname.charAt(0)}`.toUpperCase();
  };
  if (!mounted) return null;
  return <div className={cn('flex flex-col h-screen bg-gradient-to-b from-sigem-dark-blue via-[#1b2033] to-[#1d2239] text-white transition-all duration-300 border-r border-gray-800/30 shadow-lg', collapsed ? 'w-[72px]' : 'w-64', className)}>
      {/* Sidebar Header - Logo and Toggle */}
      <div className={cn("flex items-center px-4 py-3 h-16", collapsed ? "justify-center" : "justify-between")}>
        {!collapsed && <div className="text-xl font-bold tracking-tight flex items-center">
            <span className="bg-white/10 rounded-md p-1 mr-2">
              <span className="text-white text-lg font-extrabold">S</span>
            </span>
            {getModuleTitle()}
          </div>}

        {collapsed && <div className="flex items-center justify-center bg-white/10 rounded-md p-1.5">
            <span className="text-white text-base font-extrabold">S</span>
          </div>}

        {!collapsed && <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="text-white hover:bg-white/10 rounded-full transition-colors">
            <ChevronLeft size={18} />
            <span className="sr-only">Recolher</span>
          </Button>}
      </div>

      <Separator className="bg-gray-700/30 my-1" />

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2 flex flex-col">
        <nav className="space-y-1">
          {moduleItems.map(item => <TooltipProvider key={item.path} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" className={cn('w-full justify-start text-white/80 hover:text-white hover:bg-white/10 transition-colors relative group', location.pathname === item.path ? 'bg-white/15 text-white font-medium' : '', collapsed ? 'px-2' : 'px-3 h-11')} onClick={() => navigate(item.path)}>
                    <item.icon className={cn('h-5 w-5 flex-shrink-0', location.pathname === item.path ? 'text-primary' : 'text-white/70 group-hover:text-white', collapsed ? '' : 'mr-3')} />
                    
                    {!collapsed && <>
                        <span className="truncate">{item.name}</span>
                        
                        {item.badge && <Badge variant="outline" className="ml-auto bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
                            {item.badge}
                          </Badge>}
                        
                        {item.new && <Badge variant="outline" className="ml-auto bg-green-500/20 text-green-400 border-green-500/30 hover:bg-green-500/30">
                            Novo
                          </Badge>}
                      </>}
                    
                    {location.pathname === item.path && <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>}
                  </Button>
                </TooltipTrigger>
                {(collapsed || item.description) && <TooltipContent side="right" className="bg-gray-900 text-white border-gray-800 flex flex-col space-y-1">
                    <span className="font-medium">{item.name}</span>
                    {item.description && <span className="text-xs text-gray-400">{item.description}</span>}
                    {item.badge && collapsed && <Badge variant="outline" className="mt-1 bg-primary/20 text-primary border-primary/30">
                        {item.badge} notificações
                      </Badge>}
                    {item.new && collapsed && <Badge variant="outline" className="mt-1 bg-green-500/20 text-green-400 border-green-500/30">
                        Novo
                      </Badge>}
                  </TooltipContent>}
              </Tooltip>
            </TooltipProvider>)}
        </nav>
        
        <div className="mt-auto space-y-1">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className={cn('w-full justify-start text-white/80 hover:text-white hover:bg-white/10', collapsed ? 'px-2' : 'px-3')}>
                  <Bell className={cn('h-5 w-5', collapsed ? '' : 'mr-3')} />
                  {!collapsed && <span>Notificações</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right" className="bg-gray-900 text-white border-gray-800">
                  Notificações
                </TooltipContent>}
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className="text-center">
                  <Settings className={cn('h-5 w-5', collapsed ? '' : 'mr-3')} />
                  {!collapsed && <span>Configurações</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right" className="bg-gray-900 text-white border-gray-800">
                  Configurações
                </TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* User Profile Section */}
      <div className={cn("border-t border-gray-700/30 p-3", collapsed ? "px-2" : "")}>
        <div className={cn("flex items-center", collapsed ? "justify-center" : "space-x-3")}>
          <Avatar className="h-9 w-9 border-2 border-primary/30 bg-primary/10 text-white shadow-sm">
            <AvatarFallback className="bg-primary/20 text-white">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          
          {!collapsed && <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">
                {user.name} {user.surname}
              </p>
              <p className="text-xs text-white/50 truncate">
                {getModuleTitle()}
              </p>
            </div>}
        </div>
        
        <div className={cn("mt-3", collapsed ? "flex justify-center" : "")}>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className={cn('border border-gray-700/50 bg-white/5 hover:bg-white/10 transition-colors w-full justify-center text-white/90 hover:text-white', collapsed ? 'px-2 aspect-square' : 'px-3')} onClick={logout}>
                  <LogOut className="h-5 w-5 mr-0" />
                  {!collapsed && <span className="ml-2">Sair</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right" className="bg-gray-900 text-white border-gray-800">
                  Sair
                </TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {collapsed && <div className="mt-3 flex justify-center">
            <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="text-white/70 hover:bg-white/10 hover:text-white rounded-full aspect-square p-1.5">
              <ChevronRight size={18} />
              <span className="sr-only">Expandir</span>
            </Button>
          </div>}
      </div>
    </div>;
};
export default SigemSidebar;