import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const {
    login
  } = useAuth();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return <Card className="w-full max-w-md shadow-lg">
      
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required className="w-full" />
          </div>
          <div className="space-y-2">
            <Input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} required className="w-full" />
          </div>
          <Button type="submit" className="w-full bg-sigem-dark-blue hover:bg-opacity-90" disabled={isLoading}>
            {isLoading ? 'Entrando...' : 'Entrar'}
          </Button>
        </form>
      </CardContent>
      <CardFooter className="flex justify-center">
        <p className="text-sm text-gray-500">
          Para acesso de teste, use qualquer email e senha
        </p>
      </CardFooter>
    </Card>;
};
export default LoginForm;