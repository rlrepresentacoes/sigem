
import { useState, useEffect } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, Eye, EyeOff } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Navigate, useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';

const resetPasswordSchema = z.object({
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});

type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const ResetPasswordPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const form = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: '', confirmPassword: '' }
  });

  useEffect(() => {
    // Verificar se há um hash na URL (necessário para redefinição de senha)
    const hash = window.location.hash;
    if (!hash || !hash.includes('type=recovery')) {
      toast({
        variant: 'destructive',
        title: 'Link inválido',
        description: 'O link de redefinição de senha é inválido ou expirou.'
      });
      setTimeout(() => navigate('/'), 3000);
    }
  }, [navigate, toast]);

  const handleSubmit = async (data: ResetPasswordFormValues) => {
    try {
      setIsLoading(true);
      
      const { error } = await supabase.auth.updateUser({
        password: data.password
      });

      if (error) {
        throw error;
      }

      setIsSuccess(true);
      toast({
        title: 'Senha alterada com sucesso',
        description: 'Sua senha foi atualizada. Você será redirecionado para fazer login.'
      });
      
      // Redirecionar após 3 segundos
      setTimeout(() => navigate('/'), 3000);
    } catch (error: any) {
      console.error('Erro ao redefinir senha:', error);
      toast({
        variant: 'destructive',
        title: 'Falha ao redefinir senha',
        description: error.message || 'Não foi possível redefinir sua senha. Tente novamente.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // Se a redefinição for bem-sucedida, mostra a mensagem de sucesso
  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-sigem-dark-blue via-[#1b2033] to-[#232643] flex flex-col justify-center items-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold tracking-tight text-sigem-dark-blue">
              Senha redefinida com sucesso!
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-gray-600">Sua senha foi alterada com sucesso.</p>
            <p className="text-gray-600 mt-2">Você será redirecionado para a página de login em instantes...</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-sigem-dark-blue via-[#1b2033] to-[#232643] flex flex-col justify-center items-center p-4">
      <Card className="w-full max-w-md shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center">
          <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-sigem-dark-blue">
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-sigem-dark-blue">
            Redefinir Senha
          </CardTitle>
          <p className="text-sm text-gray-500">
            Crie uma nova senha para sua conta
          </p>
        </CardHeader>
        
        <CardContent className="pt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <FormControl>
                        <Input 
                          placeholder="Nova senha" 
                          type={showPassword ? "text" : "password"} 
                          className="pl-10 pr-10" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                      <Button 
                        type="button" 
                        variant="ghost" 
                        size="icon" 
                        className="absolute right-1 top-1" 
                        onClick={togglePasswordVisibility}
                        disabled={isLoading}
                      >
                        {showPassword ? 
                          <EyeOff className="h-5 w-5 text-gray-400" /> : 
                          <Eye className="h-5 w-5 text-gray-400" />
                        }
                      </Button>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <FormControl>
                        <Input 
                          placeholder="Confirmar nova senha" 
                          type={showPassword ? "text" : "password"} 
                          className="pl-10" 
                          {...field} 
                          disabled={isLoading}
                        />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <Button 
                type="submit" 
                className="w-full bg-sigem-dark-blue hover:bg-opacity-90" 
                disabled={isLoading}
              >
                {isLoading ? 'Atualizando...' : 'Atualizar senha'}
              </Button>
            </form>
          </Form>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-4">
          <Button 
            variant="link" 
            className="text-sigem-dark-blue" 
            onClick={() => navigate('/')}
            disabled={isLoading}
          >
            Voltar para o login
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ResetPasswordPage;
