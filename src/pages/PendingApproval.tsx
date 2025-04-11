import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigate } from 'react-router-dom';
const PendingApproval = () => {
  const {
    user,
    logout,
    isAuthenticated
  } = useAuth();

  // Se não estiver autenticado, redirecione para a página de login
  if (!isAuthenticated || !user) {
    return <Navigate to="/" />;
  }

  // Se o usuário não estiver pendente, redirecione para o módulo apropriado
  if (user.role !== 'pendente') {
    return <Navigate to={`/${user.role}`} />;
  }
  return <div className="min-h-screen bg-gradient-to-br from-sigem-dark-blue via-[#1b2033] to-[#232643] flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-bold tracking-tight text-sigem-dark-blue">Aprovação Pendente</CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-6 pt-4">
          <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-amber-700">
                  Sua conta foi criada com sucesso, mas aguarda aprovação do administrador.
                </p>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="text-lg font-medium">Informações da conta:</h3>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <p className="text-gray-500">Nome:</p>
              <p className="font-medium">{user.name} {user.surname}</p>
              
              <p className="text-gray-500">Email:</p>
              <p className="font-medium">{user.email}</p>
              
              <p className="text-gray-500">Função:</p>
              <p className="font-medium">{user.função || 'Não especificada'}</p>
              
              <p className="text-gray-500">Status:</p>
              <p className="font-medium text-amber-600">Pendente de aprovação</p>
            </div>
          </div>
          
          <div className="space-y-4 pt-4">
            <p className="text-sm text-gray-600">Você será informado quando sua conta for aprovada. Enquanto isso, você não poderá acessar o sistema.</p>
            
            <Button onClick={() => logout()} variant="outline" className="w-full">
              Sair
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>;
};
export default PendingApproval;