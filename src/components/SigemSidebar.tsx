import { cn } from '@/lib/utils';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, BarChart3, Calendar, LogOut, ChevronLeft, ChevronRight, PieChart, Settings, Bell, Building2, UserCog, FileBarChart, MessageSquareQuote, Briefcase, Eye } from 'lucide-react';
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
  const getUserInitials = () => {
    if (!user.name || !user.surname) return 'U';
    return `${user.name.charAt(0)}${user.surname.charAt(0)}`.toUpperCase();
  };
  if (!mounted) return null;
  return <div className={cn('flex flex-col h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 border-r border-sidebar-border shadow-sidebar', collapsed ? 'w-[80px]' : 'w-64', className)}>
      <div className={cn("flex items-center h-16", collapsed ? "px-2 justify-center" : "px-4 justify-between")}>
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center" : "")}>
          <div className="relative flex items-center justify-center rounded-md bg-white/10 p-1.5">
            <img src="/lovable-uploads/f31407fa-81f2-4a3f-8a5a-bd6195d196ac.png" alt="Logo RL" className={cn("transition-all", collapsed ? "h-9 w-9" : "h-7 w-7")} />
          </div>
          
          {!collapsed && <div className="flex flex-col">
              <h1 className="font-bold tracking-tight text-lg">SIGEM</h1>
              
            </div>}
        </div>

        {!collapsed && <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="text-white/70 hover:bg-white/10 rounded-full transition-colors h-7 w-7">
            <ChevronLeft size={16} />
            <span className="sr-only">Recolher</span>
          </Button>}
      </div>

      <Separator className="bg-sidebar-border/30 my-1" />

      <div className="flex-1 overflow-y-auto flex flex-col space-y-2 py-0 px-[8px]">
        <div className={cn("text-xs font-medium uppercase text-white/40 mb-1 px-3", collapsed && "sr-only")}>
          Navegação
        </div>
        
        <nav className="space-y-1">
          {moduleItems.map(item => <TooltipProvider key={item.path} delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" onClick={() => navigate(item.path)} className={cn("relative w-full", collapsed ? "h-16 w-16 mx-auto" : "px-3 h-10 justify-start", location.pathname === item.path ? "bg-white/15 text-white hover:bg-white/20" : "text-white/70 hover:bg-white/10 hover:text-white")}>
                    <div className={cn("flex items-center", collapsed && "flex-col justify-center h-full w-full")}>
                      <item.icon className={cn(collapsed ? 'h-8 w-8' : 'h-6 w-6', location.pathname === item.path ? 'text-white' : 'text-white/70')} />
                      
                      {!collapsed && <span className="truncate text-sm ml-3">{item.name}</span>}
                      
                      {!collapsed && item.badge}
                      
                      {!collapsed && item.new}
                    </div>
                    
                    {location.pathname === item.path && <div className="absolute left-0 top-0 bottom-0 w-1 bg-sidebar-primary rounded-r-full" />}
                    
                    {collapsed && item.badge}
                    
                    {collapsed && item.new}
                  </Button>
                </TooltipTrigger>
                
                <TooltipContent side="right" className="bg-sidebar-accent text-sidebar-foreground border-sidebar-border/50">
                  <span className="font-medium">{item.name}</span>
                  {item.description && <span className="text-xs text-white/70 block">{item.description}</span>}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>)}
        </nav>
        
        <Separator className="bg-sidebar-border/30 my-3" />
        
        <div className={cn("text-xs font-medium uppercase text-white/40 mb-1 px-3", collapsed && "sr-only")}>
          Sistema
        </div>
        
        <div className="space-y-1">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className={cn("relative w-full text-white/70 hover:bg-white/10 hover:text-white", collapsed ? "h-16 w-16 mx-auto" : "px-3 h-10 justify-start")}>
                  <div className={cn("flex items-center", collapsed && "flex-col justify-center h-full w-full")}>
                    <Bell className={collapsed ? 'h-8 w-8' : 'h-6 w-6'} />
                    {!collapsed && <span className="text-sm ml-3">Notificações</span>}
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-sidebar-accent text-sidebar-foreground border-sidebar-border/50">
                <span className="font-medium">Notificações</span>
                <span className="text-xs text-white/70 block">Visualizar notificações</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" className={cn("relative w-full text-white/70 hover:bg-white/10 hover:text-white", collapsed ? "h-16 w-16 mx-auto" : "px-3 h-10 justify-start")}>
                  <div className={cn("flex items-center", collapsed && "flex-col justify-center h-full w-full")}>
                    <Settings className={collapsed ? 'h-8 w-8' : 'h-6 w-6'} />
                    {!collapsed && <span className="text-sm ml-3">Configurações</span>}
                  </div>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="bg-sidebar-accent text-sidebar-foreground border-sidebar-border/50">
                <span className="font-medium">Configurações</span>
                <span className="text-xs text-white/70 block">Preferências do sistema</span>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <div className="border-t border-sidebar-border/30 p-4 flex flex-col items-center">
        <div className={cn("flex items-center", collapsed ? "flex-col space-y-3" : "w-full gap-3")}>
          <Avatar className={cn("border border-white/20 bg-white/10", collapsed ? "h-12 w-12" : "h-11 w-11")}>
            <AvatarFallback className="bg-sidebar-primary/20 text-white text-sm">
              {getUserInitials()}
            </AvatarFallback>
          </Avatar>
          
          {!collapsed && <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-white">
                {user.name} {user.surname}
              </p>
              <p className="text-xs text-white/50 truncate">
                {getModuleTitle()}
              </p>
            </div>}
        </div>
        
        <div className={cn("w-full", collapsed ? "mt-4" : "mt-4")}>
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" className={cn('w-full justify-center border-white/20 bg-white/5 hover:bg-white/10 text-white transition-colors', collapsed ? 'h-12 w-12 mx-auto' : 'px-3 text-sm h-10')} onClick={logout}>
                  <LogOut className={cn(collapsed ? "h-6 w-6" : "h-5 w-5")} />
                  {!collapsed && <span className="ml-2">Sair</span>}
                </Button>
              </TooltipTrigger>
              {collapsed && <TooltipContent side="right" className="bg-sidebar-accent text-sidebar-foreground border-sidebar-border/50">
                  Sair
                </TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        </div>
        
        {collapsed && <div className="mt-4 flex justify-center">
            <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="text-white/50 hover:bg-white/10 hover:text-white rounded-full aspect-square h-8 w-8">
              <ChevronRight size={20} />
              <span className="sr-only">Expandir</span>
            </Button>
          </div>}
      </div>
    </div>;
};
export default SigemSidebar;