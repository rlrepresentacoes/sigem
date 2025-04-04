
import LoginForm from '@/components/LoginForm';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';

const LoginPage = () => {
  const { isAuthenticated, user } = useAuth();

  // If user is already authenticated, redirect to appropriate module
  if (isAuthenticated && user) {
    return <Navigate to={`/${user.role}`} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sigem-dark-blue via-[#1b2033] to-[#232643] flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md">
        <LoginForm />
      </div>
      <div className="mt-6 text-white/50 text-xs text-center">
        © 2025 RL Representações - Todos os direitos reservados
      </div>
    </div>
  );
};

export default LoginPage;
