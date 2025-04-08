
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, Calendar, ChevronRight, Users, TrendingUp, BarChart3, Check, Clock, FileCheck, LineChart } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendasDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-sigem-text-primary">Dashboard de Vendas</h1>
          <p className="text-sigem-text-secondary">
            Bem-vindo, {user?.name}. Aqui está o resumo da sua atividade.
          </p>
        </div>
        <Button variant="outline" className="hidden sm:flex gap-2 border-primary/20">
          <Calendar className="h-4 w-4 text-primary" />
          <span>Abril 2025</span>
        </Button>
      </div>

      <Alert className="border-sigem-warning/30 bg-sigem-warning/10 text-sigem-text-primary shadow-sm">
        <AlertCircle className="h-4 w-4 text-sigem-warning" />
        <AlertTitle className="text-sigem-warning font-medium">Atenção</AlertTitle>
        <AlertDescription className="text-sigem-text-secondary">
          Você tem 3 clientes sem compras há mais de 3 meses. Verifique na lista de clientes.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-sm font-medium text-sigem-text-primary">
              Total de Clientes
            </CardTitle>
            <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center">
              <Users className="h-5 w-5 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-2xl font-bold text-sigem-text-primary">12</div>
            <div className="mt-1 flex items-center text-xs text-sigem-success">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+2 em relação ao mês passado</span>
            </div>
          </CardContent>
          <div className="absolute bottom-0 right-0 h-24 w-24 opacity-5">
            <Users className="h-full w-full" />
          </div>
        </Card>
        
        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-sm font-medium text-sigem-text-primary">
              Vendas Pendentes
            </CardTitle>
            <div className="h-9 w-9 rounded-lg bg-sigem-warning/10 flex items-center justify-center">
              <Clock className="h-5 w-5 text-sigem-warning" />
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-2xl font-bold text-sigem-text-primary">5</div>
            <p className="mt-1 text-xs text-sigem-text-secondary">
              2 aguardando faturamento
            </p>
          </CardContent>
          <div className="absolute bottom-0 right-0 h-24 w-24 opacity-5">
            <Clock className="h-full w-full" />
          </div>
        </Card>
        
        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-sm font-medium text-sigem-text-primary">
              Lembretes Agendados
            </CardTitle>
            <div className="h-9 w-9 rounded-lg bg-sigem-info/10 flex items-center justify-center">
              <Calendar className="h-5 w-5 text-sigem-info" />
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-2xl font-bold text-sigem-text-primary">7</div>
            <p className="mt-1 text-xs text-sigem-text-secondary">
              2 para esta semana
            </p>
          </CardContent>
          <div className="absolute bottom-0 right-0 h-24 w-24 opacity-5">
            <Calendar className="h-full w-full" />
          </div>
        </Card>
        
        <Card className="stats-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-0">
            <CardTitle className="text-sm font-medium text-sigem-text-primary">
              Vendas Concluídas
            </CardTitle>
            <div className="h-9 w-9 rounded-lg bg-sigem-success/10 flex items-center justify-center">
              <FileCheck className="h-5 w-5 text-sigem-success" />
            </div>
          </CardHeader>
          <CardContent className="p-0 pt-2">
            <div className="text-2xl font-bold text-sigem-text-primary">28</div>
            <div className="mt-1 flex items-center text-xs text-sigem-success">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12% em relação ao mês passado</span>
            </div>
          </CardContent>
          <div className="absolute bottom-0 right-0 h-24 w-24 opacity-5">
            <FileCheck className="h-full w-full" />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-sigem-text-primary">Desempenho de Vendas</CardTitle>
                <CardDescription className="text-sigem-text-secondary">
                  Últimos 30 dias
                </CardDescription>
              </div>
              <div className="rounded-lg bg-secondary p-1.5">
                <LineChart className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[240px] flex items-center justify-center px-6 pb-6">
            <div className="text-center text-sigem-text-secondary flex flex-col items-center">
              <BarChart3 className="h-12 w-12 mb-2 text-primary/30" />
              <p>Dados de desempenho serão exibidos aqui</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-lg text-sigem-text-primary">Ações Rápidas</CardTitle>
                <CardDescription className="text-sigem-text-secondary">
                  Acesse as principais funcionalidades
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="grid gap-3 px-6 pb-6">
            <Button asChild variant="outline" className="h-12 justify-between hover:bg-primary/5 border-primary/10">
              <Link to="/vendas/clientes">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-sigem-text-primary">Gerenciar Clientes</span>
                  <span className="text-xs text-sigem-text-secondary">Ver lista completa de clientes</span>
                </div>
                <ChevronRight className="h-5 w-5 text-primary" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 justify-between hover:bg-primary/5 border-primary/10">
              <Link to="#">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-sigem-text-primary">Lembretes</span>
                  <span className="text-xs text-sigem-text-secondary">Gerenciar contatos agendados</span>
                </div>
                <ChevronRight className="h-5 w-5 text-primary" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 justify-between hover:bg-primary/5 border-primary/10">
              <Link to="/vendas/analises">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-sigem-text-primary">Análises</span>
                  <span className="text-xs text-sigem-text-secondary">Consultar métricas e gráficos</span>
                </div>
                <ChevronRight className="h-5 w-5 text-primary" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendasDashboard;
