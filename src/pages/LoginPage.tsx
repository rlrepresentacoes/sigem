
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
    <div className="min-h-screen bg-white flex flex-col justify-center items-center p-4">
      <div className="w-full max-w-md relative">
        {/* Decorative elements */}
        <div className="absolute -top-10 -left-10 w-32 h-32 bg-sigem-dark-blue/5 rounded-full blur-3xl z-0"></div>
        <div className="absolute -bottom-20 -right-10 w-40 h-40 bg-sigem-light-blue/5 rounded-full blur-3xl z-0"></div>
        
        {/* Login form with elevation */}
        <div className="relative z-10">
          <LoginForm />
        </div>
      </div>
      <div className="mt-8 text-sigem-text-secondary text-xs text-center">
        © 2025 RL Representações - Todos os direitos reservados
      </div>
    </div>
  );
};

export default LoginPage;
