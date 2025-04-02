
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, Mail, User } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Esquemas de validação
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

const signupSchema = z.object({
  name: z.string().min(2, 'Nome precisa ter pelo menos 2 caracteres'),
  surname: z.string().min(2, 'Sobrenome precisa ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não correspondem",
  path: ["confirmPassword"],
});

const resetPasswordSchema = z.object({
  email: z.string().email('Email inválido'),
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;
type ResetPasswordFormValues = z.infer<typeof resetPasswordSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isResetPasswordOpen, setIsResetPasswordOpen] = useState(false);
  const { login, signup, resetPassword, isLoading } = useAuth();
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '' }
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', surname: '', email: '', password: '', confirmPassword: '' }
  });
  
  const resetPasswordForm = useForm<ResetPasswordFormValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { email: '' }
  });

  const handleLoginSubmit = async (data: LoginFormValues) => {
    try {
      await login(data.email, data.password);
    } catch (error) {
      console.error('Erro no login:', error);
    }
  };

  const handleSignupSubmit = async (data: SignupFormValues) => {
    try {
      await signup(data.email, data.password, data.name, data.surname);
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };

  const handleResetPasswordSubmit = async (data: ResetPasswordFormValues) => {
    try {
      await resetPassword(data.email);
      setIsResetPasswordOpen(false);
    } catch (error) {
      console.error('Erro na recuperação de senha:', error);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <>
      <Card className="w-full shadow-xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center pb-2">
          <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-sigem-dark-blue">
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight text-sigem-dark-blue">SIGEM</CardTitle>
          <p className="text-sm text-gray-500">Sistema de Gestão Empresarial Modular</p>
        </CardHeader>
        
        <CardContent className="pt-4">
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Cadastro</TabsTrigger>
            </TabsList>
            
            <TabsContent value="login">
              <Form {...loginForm}>
                <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4">
                  <FormField
                    control={loginForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Email" 
                              type="email" 
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
                  
                  <FormField
                    control={loginForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Senha" 
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
                  
                  <div className="flex justify-end">
                    <Button 
                      variant="link" 
                      className="text-sigem-dark-blue p-0 h-auto" 
                      type="button"
                      onClick={() => setIsResetPasswordOpen(true)}
                      disabled={isLoading}
                    >
                      Esqueci minha senha
                    </Button>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full bg-sigem-dark-blue hover:bg-opacity-90" 
                    disabled={isLoading}
                  >
                    {isLoading ? 'Entrando...' : 'Entrar'}
                  </Button>
                </form>
              </Form>
            </TabsContent>
            
            <TabsContent value="signup">
              <Form {...signupForm}>
                <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)} className="space-y-4">
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Nome" 
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
                  
                  <FormField
                    control={signupForm.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Sobrenome" 
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
                  
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Email" 
                              type="email" 
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
                  
                  <FormField
                    control={signupForm.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Senha" 
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
                    control={signupForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                          <FormControl>
                            <Input 
                              placeholder="Confirmar senha" 
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
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t pt-4">
          <p className="text-xs text-gray-500">
            RL Representações - SIGEM v1.0
          </p>
        </CardFooter>
      </Card>

      {/* Modal de recuperação de senha */}
      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Recuperar senha</DialogTitle>
            <DialogDescription>
              Digite seu email para receber um link de recuperação de senha.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...resetPasswordForm}>
            <form onSubmit={resetPasswordForm.handleSubmit(handleResetPasswordSubmit)} className="space-y-4">
              <FormField
                control={resetPasswordForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <div className="relative">
                      <Mail className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                      <FormControl>
                        <Input 
                          placeholder="Email" 
                          type="email" 
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
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setIsResetPasswordOpen(false)}
                  disabled={isLoading}
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? 'Enviando...' : 'Enviar'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default LoginForm;
