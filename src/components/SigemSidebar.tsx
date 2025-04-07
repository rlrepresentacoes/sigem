
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
  Briefcase,
  Eye
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
        }, {
          name: 'Performance',
          icon: PieChart,
          path: '/gerencia/performance',
          description: 'Métricas de desempenho'
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
        }, {
          name: 'Atendimentos',
          icon: Briefcase,
          path: '/recepcao/atendimentos',
          description: 'Histórico de atendimentos'
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
        }, {
          name: 'Observações',
          icon: Eye,
          path: '/monitorias/observacoes',
          description: 'Observações de atendimento'
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
        }, {
          name: 'Desempenho',
          icon: Users,
          path: '/rh/desempenho',
          description: 'Avaliação de desempenho'
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
      'flex flex-col h-screen bg-sigem-dark-blue text-white transition-all duration-300 border-r border-white/10 shadow-sidebar', 
      collapsed ? 'w-[70px]' : 'w-64', 
      className
    )}>
      {/* Sidebar Header - Logo and Toggle */}
      <div className={cn("flex items-center h-16", collapsed ? "px-2 justify-center" : "px-4 justify-between")}>
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <div className="relative flex items-center justify-center rounded-md bg-white/10 p-1.5">
            <img 
              src="/lovable-uploads/f31407fa-81f2-4a3f-8a5a-bd6195d196ac.png" 
              alt="Logo RL" 
              className={cn("transition-all", collapsed ? "h-6 w-6" : "h-6 w-6")} 
            />
          </div>
          
          {!collapsed && (
            <div className="flex flex-col">
              <h1 className="font-bold tracking-tight text-lg">SIGEM</h1>
              <p className="text-xs font-light text-white/70 -mt-0.5">{getModuleTitle()}</p>
            </div>
          )}
        </div>

        {!collapsed && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={() => setCollapsed(!collapsed)} 
            className="text-white/70 hover:bg-white/10 rounded-full transition-colors h-7 w-7"
          >
            <ChevronLeft size={16} />
            <span className="sr-only">Recolher</span>
          </Button>
        )}
      </div>

      <Separator className="bg-white/10 my-1" />

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto py-4 px-2 flex flex-col space-y-2">
        <div className={cn("text-xs font-medium uppercase text-white/40 mb-1 px-3", collapsed && "sr-only")}>
          Navegação
        </div>
        
        <nav className="space-y-1">
          {moduleItems.map(item => (
            <TooltipProvider key={item.path} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    onClick={() => navigate(item.path)} 
                    className={cn(
                      "relative w-full justify-start font-medium",
                      collapsed ? "px-0 h-10" : "px-3 h-9",
                      location.pathname === item.path 
                        ? "bg-white/15 text-white hover:bg-white/20" 
                        : "text-white/70 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "flex items-center gap-3",
                      collapsed && "flex-col justify-center h-full w-full gap-1"
                    )}>
                      <item.icon className={cn(
                        'h-4 w-4 flex-shrink-0',
                        location.pathname === item.path ? 'text-white' : 'text-white/70'
                      )} />
                      
                      {!collapsed && <span className="truncate text-sm">{item.name}</span>}
                      {collapsed && <span className="text-[9px]">{item.name}</span>}
                      
                      {!collapsed && item.badge && (
                        <Badge className="ml-auto bg-sigem-accent-blue/80 text-white border-0 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                      
                      {!collapsed && item.new && (
                        <Badge className="ml-auto bg-sigem-info/80 text-white border-0 text-xs">
                          Novo
                        </Badge>
                      )}
                    </div>
                    
                    {location.pathname === item.path && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-full" />
                    )}
                    
                    {collapsed && item.badge && (
                      <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center rounded-full bg-sigem-accent-blue text-white border-0 text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    
                    {collapsed && item.new && (
                      <div className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-sigem-info" />
                    )}
                  </Button>
                </TooltipTrigger>
                
                {(collapsed || item.description) && (
                  <TooltipContent side="right" className="bg-sigem-dark-blue text-white border-white/10">
                    <span className="font-medium">{item.name}</span>
                    {item.description && <span className="text-xs text-white/70 block">{item.description}</span>}
                  </TooltipContent>
                )}
              </Tooltip>
            </TooltipProvider>
          ))}
        </nav>
        
        <Separator className="bg-white/10 my-3" />
        
        <div className={cn("text-xs font-medium uppercase text-white/40 mb-1 px-3", collapsed && "sr-only")}>
          Sistema
        </div>
        
        <div className="space-y-1">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  className={cn(
                    "relative w-full justify-start font-medium text-white/70 hover:bg-white/10 hover:text-white",
                    collapsed ? "px-0 h-10" : "px-3 h-9"
                  )}
                >
                  <div className={cn(
                    "flex items-center gap-3",
                    collapsed && "flex-col justify-center h-full w-full gap-1"
                  )}>
                    <Bell className="h-4 w-4 text-white/70" />
                    {!collapsed && <span className="text-sm">Notificações</span>}
                    {collapsed && <span className="text-[9px]">Notificar</span>}
                  </div>
                </Button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right" className="bg-sigem-dark-blue text-white border-white/10">
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
                    "relative w-full justify-start font-medium text-white/70 hover:bg-white/10 hover:text-white",
                    collapsed ? "px-0 h-10" : "px-3 h-9"
                  )}
                >
                  <div className={cn(
                    "flex items-center gap-3",
                    collapsed && "flex-col justify-center h-full w-full gap-1"
                  )}>
                    <Settings className="h-4 w-4 text-white/70" />
                    {!collapsed && <span className="text-sm">Configurações</span>}
                    {collapsed && <span className="text-[9px]">Config</span>}
                  </div>
                </Button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right" className="bg-sigem-dark-blue text-white border-white/10">
                  Configurações
                </TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="border-t border-white/10 p-3">
        <div className={cn("flex items-center", collapsed ? "flex-col gap-2" : "gap-3")}>
          <Avatar className="h-8 w-8 border border-white/20 bg-sigem-accent-blue text-white">
            <AvatarFallback className="bg-sigem-accent-blue text-white text-xs">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">
                {user.name} {user.surname}
              </p>
              <p className="text-xs text-white/50 truncate">
                {getModuleTitle()}
              </p>
            </div>
          )}
        </div>
        
        <div className="mt-2">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    'w-full justify-center border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors', 
                    collapsed ? 'px-0 aspect-square' : 'px-3 text-sm'
                  )} 
                  onClick={logout}
                >
                  <LogOut className="h-4 w-4" />
                  {!collapsed && <span className="ml-2">Sair</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && (
                <TooltipContent side="right" className="bg-sigem-dark-blue text-white border-white/10">
                  Sair
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {collapsed && (
          <div className="mt-2 flex justify-center">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setCollapsed(!collapsed)} 
              className="text-white/50 hover:bg-white/10 hover:text-white rounded-full aspect-square h-6 w-6"
            >
              <ChevronRight size={16} />
              <span className="sr-only">Expandir</span>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SigemSidebar;
