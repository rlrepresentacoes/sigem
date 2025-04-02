
import React, { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';

interface UserProfile {
  id: string;
  name: string;
  surname: string;
  role: 'gerencia' | 'vendas' | 'recepcao' | 'monitorias' | 'rh' | 'pendente';
  responsibleName: string;
  email: string;
  photoUrl?: string;
  jobTitle?: string;
}

interface AuthContextType {
  user: UserProfile | null;
  session: Session | null;
  login: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Configurar o listener para mudanças no estado de autenticação
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, currentSession) => {
        setSession(currentSession);
        
        if (currentSession?.user) {
          await fetchUserProfile(currentSession.user);
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
        
        setIsLoading(false);
      }
    );

    // Verificar sessão inicial
    const initializeAuth = async () => {
      setIsLoading(true);
      const { data: { session: initialSession } } = await supabase.auth.getSession();
      
      if (initialSession?.user) {
        await fetchUserProfile(initialSession.user);
      } else {
        setIsLoading(false);
      }
    };

    initializeAuth();

    // Limpar subscription quando o componente for desmontado
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (supabaseUser: SupabaseUser) => {
    try {
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', supabaseUser.id)
        .single();

      if (error) {
        throw error;
      }

      if (profile) {
        // Convertendo para o formato que a aplicação espera
        const userProfile: UserProfile = {
          id: profile.id,
          name: profile.name || '',
          surname: profile.surname || '',
          role: profile.role as UserProfile['role'],
          responsibleName: profile.responsible_name || '',
          email: supabaseUser.email || '',
          photoUrl: profile.photo_url,
          jobTitle: profile.job_title
        };

        setUser(userProfile);
        setIsAuthenticated(profile.role !== 'pendente');

        // Mostrar toast específico para usuários pendentes
        if (profile.role === 'pendente') {
          toast({
            title: 'Acesso pendente',
            description: 'Sua conta está aguardando aprovação de um administrador.',
            variant: 'destructive'
          });
          navigate('/');
        }
      }
    } catch (error) {
      console.error('Erro ao buscar perfil do usuário:', error);
      setUser(null);
      setIsAuthenticated(false);
    }
    
    setIsLoading(false);
  };

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signInWithPassword({
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
        description: error.message || 'Email ou senha inválidos. Por favor, tente novamente.',
      });
      setIsLoading(false);
    }
  };

  const signUp = async (email: string, password: string, userData: Partial<UserProfile>) => {
    try {
      setIsLoading(true);
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: userData.name,
            surname: userData.surname,
            photo_url: userData.photoUrl,
            job_title: userData.jobTitle
          }
        }
      });

      if (error) {
        throw error;
      }

      toast({
        title: 'Cadastro realizado com sucesso',
        description: 'Sua conta foi criada e está aguardando aprovação de um administrador.',
      });
    } catch (error: any) {
      console.error('Erro de cadastro:', error);
      toast({
        variant: 'destructive',
        title: 'Falha no cadastro',
        description: error.message || 'Não foi possível criar sua conta. Por favor, tente novamente.',
      });
      setIsLoading(false);
    }
  };

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    
    if (error) {
      console.error('Erro ao fazer logout:', error);
      toast({
        variant: 'destructive',
        title: 'Erro ao sair',
        description: 'Ocorreu um problema ao tentar sair. Tente novamente.',
      });
    } else {
      setUser(null);
      setSession(null);
      setIsAuthenticated(false);
      navigate('/');
      toast({
        title: 'Logout realizado',
        description: 'Você saiu com sucesso.',
      });
    }
  };

  return (
    <AuthContext.Provider value={{ user, session, login, signUp, logout, isAuthenticated, isLoading }}>
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
