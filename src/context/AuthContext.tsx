
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { User, Session } from '@supabase/supabase-js';

// Define the profile type based on the database structure
interface Profile {
  id: string;
  name: string | null;
  surname: string | null;
  role: 'gerencia' | 'vendas' | 'recepcao' | 'monitorias' | 'rh' | 'pendente';
  responsible_name: string | null;
  photo_url: string | null;
  job_title: string | null;
  função: 'Vendedor' | 'Assistente Comercial' | 'Recepção' | 'Recursos Humanos' | 'Gerência' | 'Monitoria e Desempenho' | 'Outro' | null;
}

interface UserWithProfile {
  id: string;
  name: string | null;
  surname: string | null;
  role: 'gerencia' | 'vendas' | 'recepcao' | 'monitorias' | 'rh' | 'pendente';
  responsibleName: string | null;
  email: string;
  photoUrl: string | null;
  jobTitle: string | null;
  função: 'Vendedor' | 'Assistente Comercial' | 'Recepção' | 'Recursos Humanos' | 'Gerência' | 'Monitoria e Desempenho' | 'Outro' | null;
}

interface AuthContextType {
  user: UserWithProfile | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  signup: (email: string, password: string, name: string, surname: string, função?: string) => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserWithProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Configure o listener para mudanças no estado da autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, newSession) => {
        setSession(newSession);
        setIsAuthenticated(!!newSession);
        
        // Se houver uma sessão, busque os dados do perfil
        if (newSession?.user) {
          // Use setTimeout para evitar deadlock no Supabase
          setTimeout(() => {
            fetchUserProfile(newSession.user);
          }, 0);
        } else {
          setUser(null);
        }
      }
    );

    // Verifique a sessão atual durante a inicialização
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setIsAuthenticated(!!currentSession);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user);
      } else {
        setUser(null);
      }
      setIsLoading(false);
    });

    // Limpe o listener ao desmontar o componente
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Função para buscar o perfil do usuário do banco de dados
  const fetchUserProfile = async (authUser: User) => {
    try {
      // Use a type assertion to tell TypeScript that 'profiles' is a valid table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', authUser.id)
        .single();

      if (error) {
        throw error;
      }

      if (data) {
        // Type assertion to treat data as Profile
        const profile = data as Profile;
        
        const userProfile: UserWithProfile = {
          id: profile.id,
          name: profile.name,
          surname: profile.surname,
          role: profile.role,
          responsibleName: profile.responsible_name,
          email: authUser.email || '',
          photoUrl: profile.photo_url,
          jobTitle: profile.job_title,
          função: profile.função
        };

        setUser(userProfile);
        
        // Redirecione o usuário com base no perfil
        if (profile.role === 'pendente') {
          navigate('/pending');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar o perfil do usuário:', error);
    }
    
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Login realizado com sucesso',
        description: 'Bem-vindo de volta!',
      });
    } catch (error: any) {
      console.error('Erro de login:', error);
      toast({
        variant: 'destructive',
        title: 'Falha no login',
        description: error.message || 'Email ou senha inválidos. Tente novamente.',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string, name: string, surname: string, função?: string) => {
    try {
      setIsLoading(true);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            surname,
            função
          }
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Cadastro realizado com sucesso',
        description: 'Sua conta foi criada e aguarda aprovação.',
      });
      
      // Navegue para a página de pendência de aprovação
      navigate('/pending');
    } catch (error: any) {
      console.error('Erro de cadastro:', error);
      toast({
        variant: 'destructive',
        title: 'Falha no cadastro',
        description: error.message || 'Não foi possível criar sua conta. Tente novamente.',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const resetPassword = async (email: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Email de recuperação enviado',
        description: 'Verifique sua caixa de entrada para redefinir sua senha.',
      });
    } catch (error: any) {
      console.error('Erro ao solicitar redefinição de senha:', error);
      toast({
        variant: 'destructive',
        title: 'Falha ao solicitar redefinição',
        description: error.message || 'Não foi possível enviar o email de recuperação. Tente novamente.',
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        throw error;
      }
      
      setUser(null);
      setIsAuthenticated(false);
      navigate('/');
      
      toast({
        title: 'Logout realizado',
        description: 'Você saiu do sistema com sucesso.',
      });
    } catch (error: any) {
      console.error('Erro ao fazer logout:', error);
      toast({
        variant: 'destructive',
        title: 'Falha ao sair',
        description: error.message || 'Não foi possível fazer logout. Tente novamente.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ 
        user, 
        login, 
        logout, 
        isAuthenticated,
        isLoading,
        signup,
        resetPassword
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  return context;
};
