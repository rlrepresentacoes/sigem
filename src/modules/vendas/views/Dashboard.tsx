
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { AlertCircle, Calendar, ChevronRight, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

const VendasDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard de Vendas</h1>
        <p className="text-muted-foreground">
          Bem-vindo, {user?.name}. Aqui está o resumo da sua atividade.
        </p>
      </div>

      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Atenção</AlertTitle>
        <AlertDescription>
          Você tem 3 clientes sem compras há mais de 3 meses. Verifique na lista de clientes.
        </AlertDescription>
      </Alert>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Clientes
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Vendas Pendentes
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              2 aguardando faturamento
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Lembretes Agendados
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">
              2 para esta semana
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Ações Rápidas</CardTitle>
          <CardDescription>
            Acesse as principais funcionalidades do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <Button asChild variant="outline" className="h-20 justify-between">
            <Link to="/vendas/clientes">
              <div className="flex flex-col items-start">
                <span className="text-lg font-medium">Gerenciar Clientes</span>
                <span className="text-sm text-muted-foreground">Ver lista completa de clientes</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-20 justify-between">
            <Link to="#">
              <div className="flex flex-col items-start">
                <span className="text-lg font-medium">Lembretes</span>
                <span className="text-sm text-muted-foreground">Gerenciar contatos agendados</span>
              </div>
              <ChevronRight className="h-5 w-5" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendasDashboard;
