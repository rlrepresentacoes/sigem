
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { isAuthenticated, user, isLoading } = useAuth();

  // Se estiver carregando, mostra uma tela de loading
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sigem-dark-blue via-[#1b2033] to-[#232643] flex flex-col justify-center items-center p-4">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-20 w-20 bg-white/20 rounded-full mb-4"></div>
          <div className="h-6 w-32 bg-white/20 rounded mb-2"></div>
          <div className="h-4 w-48 bg-white/10 rounded"></div>
        </div>
      </div>
    );
  }

  // Se o usuário está autenticado e não tem role pendente, redireciona para o módulo apropriado
  if (isAuthenticated && user && user.role !== 'pendente') {
    return <Navigate to={`/${user.role}`} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sigem-dark-blue via-[#1b2033] to-[#232643] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
