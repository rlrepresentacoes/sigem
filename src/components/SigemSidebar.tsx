
import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  BarChart3, 
  Calendar, 
  ClipboardCheck, 
  LogOut, 
  ChevronLeft, 
  ChevronRight, 
  PieChart, 
  Settings, 
  Bell, 
  Building2, 
  UserCog,
  FileBarChart,
  MessageSquareQuote,
  UserCheck
} from 'lucide-react';
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
          icon: Building2,
          path: '/vendas/clientes',
          description: 'Gerenciamento de clientes'
        }, {
          name: 'Análises',
          icon: FileBarChart,
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
          icon: MessageSquareQuote,
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
          icon: UserCog,
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
  
  return (
    <div className={cn(
      'flex flex-col h-screen bg-gradient-to-b from-[#111827] via-[#141e33] to-[#192339] text-white transition-all duration-300 border-r border-indigo-900/30 shadow-xl', 
      collapsed ? 'w-[80px]' : 'w-72', 
      className
    )}>
      {/* Sidebar Header - Logo and Toggle */}
      <div className={cn("flex items-center h-16", collapsed ? "px-2 justify-center" : "px-5 justify-between")}>
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <div className="relative flex items-center justify-center rounded-lg bg-white/10 p-1.5 shadow-inner">
            <img 
              src="/lovable-uploads/f31407fa-81f2-4a3f-8a5a-bd6195d196ac.png" 
              alt="Logo RL" 
              className={cn("transition-all", collapsed ? "h-8 w-8" : "h-7 w-7")} 
            />
          </div>
          
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="font-bold tracking-tight text-lg">SIGEM</h1>
              <p className="text-xs font-light text-indigo-200/70 -mt-0.5">{getModuleTitle()}</p>
            </div>
          )}
        </div>

        {!collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)} 
            className="text-indigo-200 hover:bg-indigo-800/20 rounded-full transition-colors h-8 w-8"
          >
            <ChevronLeft size={18} />
            <span className="sr-only">Recolher</span>
          </Button>
        )}
      </div>

      <Separator className="bg-indigo-900/30 my-1" />

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-5 px-3 flex flex-col space-y-2">
        <div className={cn("text-xs font-medium uppercase text-indigo-300/50 mb-2 px-3", collapsed && "sr-only")}>
          Navegação
        </div>
        
        <nav className="space-y-1.5">
          {moduleItems.map(item => (
            <TooltipProvider key={item.path} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate(item.path)} 
                    className={cn(
                      "relative w-full justify-start font-medium",
                      collapsed ? "px-0 h-12" : "px-3",
                      location.pathname === item.path 
                        ? "bg-indigo-900/40 text-white hover:bg-indigo-900/50" 
                        : "text-indigo-100/70 hover:bg-indigo-800/20 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "flex items-center gap-3",
                      collapsed && "flex-col justify-center h-full w-full gap-1"
                    )}>
                      <item.icon className={cn(
                        'h-5 w-5 flex-shrink-0',
                        location.pathname === item.path ? 'text-indigo-300' : 'text-indigo-400/70'
                      )} />
                      
                      {!collapsed && <span className="truncate">{item.name}</span>}
                      {collapsed && <span className="text-[10px]">{item.name}</span>}
                      
                      {!collapsed && item.badge && (
                        <Badge variant="outline" className="ml-auto bg-indigo-500/20 text-indigo-300 border-indigo-500/30 hover:bg-indigo-500/30">
                          {item.badge}
                        </Badge>
                      )}
                      
                      {!collapsed && item.new && (
                        <Badge variant="outline" className="ml-auto bg-emerald-500/20 text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/30">
                          Novo
                        </Badge>
                      )}
                    </div>
                    
                    {location.pathname === item.path && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-400 rounded-r-full" />
                    )}
                    
                    {collapsed && item.badge && (
                      <Badge variant="outline" className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center rounded-full bg-indigo-500 text-white border-0 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    
                    {collapsed && item.new && (
                      <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-emerald-500" />
                    )}
                  </Button>
                </TooltipTrigger>
                
                {(collapsed || item.description) && (
                  <TooltipContent side="right" className="bg-gray-900 text-white border-gray-800 flex flex-col space-y-1">
                    <span className="font-medium">{item.name}</span>
                    {item.description && <span className="text-xs text-gray-400">{item.description}</span>}
                    {item.badge && collapsed && (
                      <Badge variant="outline" className="mt-1 bg-indigo-500/20 text-indigo-300 border-indigo-500/30">
                        {item.badge} notificações
                      </Badge>
                    )}
                    {item.new && collapsed && (
                      <Badge variant="outline" className="mt-1 bg-emerald-500/20 text-emerald-300 border-emerald-500/30">
                        Novo
                      </Badge>
                    )}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
        
        <Separator className="bg-indigo-900/30 my-3" />
        
        <div className={cn("text-xs font-medium uppercase text-indigo-300/50 mb-2 px-3", collapsed && "sr-only")}>
          Sistema
        </div>
        
        <div className="space-y-1.5">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "relative w-full justify-start font-medium text-indigo-100/70 hover:bg-indigo-800/20 hover:text-white",
                    collapsed ? "px-0 h-12" : "px-3"
                  )}
                >
                  <div className={cn(
                    "flex items-center gap-3",
                    collapsed && "flex-col justify-center h-full w-full gap-1"
                  )}>
                    <Bell className="h-5 w-5 text-indigo-400/70" />
                    {!collapsed && <span>Notificações</span>}
                    {collapsed && <span className="text-[10px]">Notificar</span>}
                  </div>
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
                <Button 
                  variant="ghost" 
                  className={cn(
                    "relative w-full justify-start font-medium text-indigo-100/70 hover:bg-indigo-800/20 hover:text-white",
                    collapsed ? "px-0 h-12" : "px-3"
                  )}
                >
                  <div className={cn(
                    "flex items-center gap-3",
                    collapsed && "flex-col justify-center h-full w-full gap-1"
                  )}>
                    <Settings className="h-5 w-5 text-indigo-400/70" />
                    {!collapsed && <span>Configurações</span>}
                    {collapsed && <span className="text-[10px]">Config</span>}
                  </div>
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
      <div className="border-t border-indigo-900/30 p-4">
        <div className={cn("flex items-center", collapsed ? "flex-col gap-2" : "gap-3")}>
          <Avatar className="h-10 w-10 border-2 border-indigo-400/30 bg-indigo-900/30 text-white shadow-lg">
            <AvatarFallback className="bg-indigo-500/20 text-white">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">
                {user.name} {user.surname}
              </p>
              <p className="text-xs text-indigo-300/50 truncate">
                {getModuleTitle()}
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-3">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    'w-full justify-center border-indigo-800/50 bg-indigo-950/50 hover:bg-indigo-900/30 text-indigo-200 hover:text-white transition-colors', 
                    collapsed ? 'px-0 aspect-square' : 'px-3'
                  )} 
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">Sair</span>}
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
        
        {collapsed && (
          <div className="mt-3 flex justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(!collapsed)} 
              className="text-indigo-300/70 hover:bg-indigo-800/20 hover:text-white rounded-full aspect-square h-8 w-8"
            >
              <ChevronRight size={18} />
              <span className="sr-only">Expandir</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SigemSidebar;
