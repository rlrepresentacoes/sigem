
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  name: string;
  surname: string;
  role: 'gerencia' | 'vendas' | 'recepcao' | 'monitorias' | 'rh';
  responsibleName: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check for saved user in localStorage
    const savedUser = localStorage.getItem('sigem_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Simulated authentication for now (would be replaced with Supabase Auth)
      // In a real application, this would validate against Supabase

      if (email && password) {
        // Mocked user data for demonstration purposes
        const mockUser: User = {
          id: '1',
          name: 'David',
          surname: 'Damasceno',
          role: email.includes('gerencia') ? 'gerencia' : 
                email.includes('rh') ? 'rh' :
                email.includes('monitorias') ? 'monitorias' :
                email.includes('recepcao') ? 'recepcao' : 'vendas',
          responsibleName: 'DAVIDDAMASCENO',
          email: email
        };

        // Save the user to state and localStorage
        setUser(mockUser);
        setIsAuthenticated(true);
        localStorage.setItem('sigem_user', JSON.stringify(mockUser));

        // Redirect user based on role
        navigate(`/${mockUser.role}`);
        
        toast({
          title: 'Login successful',
          description: `Welcome back, ${mockUser.name}!`,
        });
      } else {
        throw new Error('Email and password are required');
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: 'Invalid email or password. Please try again.',
      });
    }
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('sigem_user');
    navigate('/');
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out.',
    });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
