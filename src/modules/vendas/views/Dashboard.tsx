
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, Calendar, ChevronRight, Users, TrendingUp, BarChart3, Check, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendasDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-sigem-text-primary">Dashboard de Vendas</h1>
          <p className="text-sigem-text-secondary">
            Bem-vindo, {user?.name}. Aqui está o resumo da sua atividade.
          </p>
        </div>
        <Button variant="outline" className="hidden sm:flex gap-2">
          <Calendar className="h-4 w-4" />
          <span>Abril 2025</span>
        </Button>
      </div>

      <Alert className="border-sigem-warning/30 bg-sigem-warning/10 text-sigem-text-primary">
        <AlertCircle className="h-4 w-4 text-sigem-warning" />
        <AlertTitle className="text-sigem-warning font-medium">Atenção</AlertTitle>
        <AlertDescription className="text-sigem-text-secondary">
          Você tem 3 clientes sem compras há mais de 3 meses. Verifique na lista de clientes.
        </AlertDescription>
      </Alert>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-sigem-text-primary">
              Total de Clientes
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-sigem-dark-blue/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-sigem-dark-blue" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sigem-text-primary">12</div>
            <div className="mt-1 flex items-center text-xs text-sigem-success">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+2 em relação ao mês passado</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-sigem-text-primary">
              Vendas Pendentes
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-sigem-warning/10 flex items-center justify-center">
              <Clock className="h-4 w-4 text-sigem-warning" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sigem-text-primary">5</div>
            <p className="mt-1 text-xs text-sigem-text-secondary">
              2 aguardando faturamento
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-sigem-text-primary">
              Lembretes Agendados
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-sigem-info/10 flex items-center justify-center">
              <Calendar className="h-4 w-4 text-sigem-info" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sigem-text-primary">7</div>
            <p className="mt-1 text-xs text-sigem-text-secondary">
              2 para esta semana
            </p>
          </CardContent>
        </Card>
        
        <Card className="card-dashboard">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-sigem-text-primary">
              Vendas Concluídas
            </CardTitle>
            <div className="h-8 w-8 rounded-full bg-sigem-success/10 flex items-center justify-center">
              <Check className="h-4 w-4 text-sigem-success" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sigem-text-primary">28</div>
            <div className="mt-1 flex items-center text-xs text-sigem-success">
              <TrendingUp className="mr-1 h-3 w-3" />
              <span>+12% em relação ao mês passado</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle className="text-lg text-sigem-text-primary">Desempenho de Vendas</CardTitle>
            <CardDescription className="text-sigem-text-secondary">
              Últimos 30 dias
            </CardDescription>
          </CardHeader>
          <CardContent className="h-[240px] flex items-center justify-center">
            <div className="text-center text-sigem-text-secondary flex flex-col items-center">
              <BarChart3 className="h-12 w-12 mb-2 text-sigem-dark-blue/50" />
              <p>Dados de desempenho serão exibidos aqui</p>
            </div>
          </CardContent>
        </Card>

        <Card className="card-dashboard">
          <CardHeader>
            <CardTitle className="text-lg text-sigem-text-primary">Ações Rápidas</CardTitle>
            <CardDescription className="text-sigem-text-secondary">
              Acesse as principais funcionalidades do sistema
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <Button asChild variant="outline" className="h-12 justify-between hover:bg-sigem-dark-blue/5 border-sigem-dark-blue/10">
              <Link to="/vendas/clientes">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-sigem-text-primary">Gerenciar Clientes</span>
                  <span className="text-xs text-sigem-text-secondary">Ver lista completa de clientes</span>
                </div>
                <ChevronRight className="h-5 w-5 text-sigem-dark-blue" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 justify-between hover:bg-sigem-dark-blue/5 border-sigem-dark-blue/10">
              <Link to="#">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-sigem-text-primary">Lembretes</span>
                  <span className="text-xs text-sigem-text-secondary">Gerenciar contatos agendados</span>
                </div>
                <ChevronRight className="h-5 w-5 text-sigem-dark-blue" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="h-12 justify-between hover:bg-sigem-dark-blue/5 border-sigem-dark-blue/10">
              <Link to="/vendas/analises">
                <div className="flex flex-col items-start">
                  <span className="text-sm font-medium text-sigem-text-primary">Análises</span>
                  <span className="text-xs text-sigem-text-secondary">Consultar métricas e gráficos</span>
                </div>
                <ChevronRight className="h-5 w-5 text-sigem-dark-blue" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default VendasDashboard;
