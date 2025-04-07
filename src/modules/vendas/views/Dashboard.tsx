
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { useAuth } from '@/context/AuthContext';
import { 
  AlertCircle, 
  Calendar, 
  ChevronRight, 
  Users, 
  TrendingUp, 
  Clock, 
  ShoppingCart, 
  BarChart2, 
  UserCheck 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const VendasDashboard = () => {
  const { user } = useAuth();

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gradient">Dashboard de Vendas</h1>
        <p className="text-muted-foreground mt-1">
          Bem-vindo, {user?.name}. Aqui está o resumo da sua atividade.
        </p>
      </div>

      <Alert variant="destructive" className="bg-red-50 border-red-200 text-red-800 shadow-md">
        <AlertCircle className="h-5 w-5" />
        <AlertTitle className="font-medium">Atenção</AlertTitle>
        <AlertDescription className="mt-1">
          Você tem 3 clientes sem compras há mais de 3 meses. Verifique na lista de clientes.
        </AlertDescription>
      </Alert>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="shadow-card hover-scale border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20">
            <CardTitle className="text-sm font-medium">
              Total de Clientes
            </CardTitle>
            <div className="rounded-full p-2 bg-blue-100 dark:bg-blue-900/30">
              <Users className="h-4 w-4 text-sigem-blue" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-sigem-blue">12</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1 text-sigem-green" />
              +2 em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover-scale border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20">
            <CardTitle className="text-sm font-medium">
              Vendas Pendentes
            </CardTitle>
            <div className="rounded-full p-2 bg-amber-100 dark:bg-amber-900/30">
              <ShoppingCart className="h-4 w-4 text-sigem-orange" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-sigem-orange">5</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1 text-sigem-yellow" />
              2 aguardando faturamento
            </p>
          </CardContent>
        </Card>
        
        <Card className="shadow-card hover-scale border-none">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 bg-gradient-to-r from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20">
            <CardTitle className="text-sm font-medium">
              Lembretes Agendados
            </CardTitle>
            <div className="rounded-full p-2 bg-purple-100 dark:bg-purple-900/30">
              <Calendar className="h-4 w-4 text-sigem-purple" />
            </div>
          </CardHeader>
          <CardContent className="pt-4">
            <div className="text-3xl font-bold text-sigem-purple">7</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <Clock className="h-3 w-3 mr-1 text-sigem-indigo" />
              2 para esta semana
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-card border-none">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
          <CardTitle className="text-xl font-semibold">Ações Rápidas</CardTitle>
          <CardDescription>
            Acesse as principais funcionalidades do sistema
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2 p-6">
          <Button asChild variant="outline" className="h-24 justify-between shadow-button hover:shadow-none hover:bg-blue-50 border border-blue-100 transition-all">
            <Link to="/vendas/clientes">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-blue-100 text-sigem-blue">
                  <UserCheck className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium">Gerenciar Clientes</span>
                  <span className="text-sm text-muted-foreground">Ver lista completa de clientes</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-sigem-blue" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="h-24 justify-between shadow-button hover:shadow-none hover:bg-purple-50 border border-purple-100 transition-all">
            <Link to="#">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-purple-100 text-sigem-purple">
                  <Calendar className="h-6 w-6" />
                </div>
                <div className="flex flex-col items-start">
                  <span className="text-lg font-medium">Lembretes</span>
                  <span className="text-sm text-muted-foreground">Gerenciar contatos agendados</span>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-sigem-purple" />
            </Link>
          </Button>
        </CardContent>
        <CardFooter className="bg-gray-50 dark:bg-gray-900/50 p-4 justify-end">
          <Button variant="ghost" size="sm" className="text-sigem-blue hover:text-sigem-indigo" asChild>
            <Link to="/vendas/analises">
              <BarChart2 className="h-4 w-4 mr-1" />
              Ver análises completas
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default VendasDashboard;
