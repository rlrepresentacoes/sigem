
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
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-sigem-dark-blue">SIGEM</h1>
        <p className="text-gray-600">Sistema de Gestão Empresarial Modular</p>
      </div>
      <LoginForm />
    </div>
  );
};

export default LoginPage;
