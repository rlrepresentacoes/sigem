
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

// Esquemas de validação
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
});

// Lista de funções válidas para validação
const validFuncoes = [
  'Vendedor', 
  'Assistente Comercial', 
  'Recepção', 
  'Recursos Humanos', 
  'Gerência', 
  'Monitoria e Desempenho', 
  'Outro'
] as const;

const signupSchema = z.object({
  name: z.string().min(2, 'Nome precisa ter pelo menos 2 caracteres'),
  surname: z.string().min(2, 'Sobrenome precisa ter pelo menos 2 caracteres'),
  email: z.string().email('Email inválido'),
  função: z.enum(validFuncoes, {
    required_error: "Selecione sua função",
  }),
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
    defaultValues: { name: '', surname: '', email: '', função: undefined as any, password: '', confirmPassword: '' }
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
      await signup(data.email, data.password, data.name, data.surname, data.função);
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
      <Card className="w-full shadow-lg border border-white/30 bg-white/90 backdrop-blur-sm overflow-hidden rounded-xl">
        <CardHeader className="space-y-1 text-center pb-4 border-b">
          <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-primary/5">
            <img src="/lovable-uploads/f31407fa-81f2-4a3f-8a5a-bd6195d196ac.png" alt="Logo RL Representações" className="h-12 w-12" />
          </div>
          <CardTitle className="text-xl font-semibold text-primary">SIGEM</CardTitle>
          <p className="text-sm text-muted-foreground">Sistema de Gestão Empresarial Modular</p>
        </CardHeader>
        
        <CardContent className="pt-6">
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
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input 
                              placeholder="Email" 
                              type="email" 
                              className="pl-10 h-10 bg-secondary/50 border-input input-focus" 
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
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input 
                              placeholder="Senha" 
                              type={showPassword ? "text" : "password"} 
                              className="pl-10 pr-10 h-10 bg-secondary/50 border-input input-focus" 
                              {...field} 
                              disabled={isLoading}
                            />
                          </FormControl>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="icon" 
                            className="absolute right-1 top-1 h-8 w-8 text-muted-foreground hover:text-primary" 
                            onClick={togglePasswordVisibility}
                            disabled={isLoading}
                          >
                            {showPassword ? 
                              <EyeOff className="h-4 w-4" /> : 
                              <Eye className="h-4 w-4" />
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
                      className="text-primary p-0 h-auto text-sm" 
                      type="button"
                      onClick={() => setIsResetPasswordOpen(true)}
                      disabled={isLoading}
                    >
                      Esqueci minha senha
                    </Button>
                  </div>
                  
                  <Button 
                    type="submit" 
                    className="w-full shadow-sm" 
                    variant="gradient"
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
                  <div className="grid grid-cols-2 gap-4">
                    <FormField
                      control={signupForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <div className="relative">
                            <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                            <FormControl>
                              <Input 
                                placeholder="Nome" 
                                className="pl-10 h-10 bg-secondary/50 border-input input-focus" 
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
                          <FormControl>
                            <Input 
                              placeholder="Sobrenome" 
                              className="h-10 bg-secondary/50 border-input input-focus" 
                              {...field} 
                              disabled={isLoading}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={signupForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input 
                              placeholder="Email" 
                              type="email" 
                              className="pl-10 h-10 bg-secondary/50 border-input input-focus" 
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
                    name="função"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <SelectTrigger className="h-10 bg-secondary/50 border-input focus:border-primary focus:ring-primary/20">
                              <SelectValue placeholder="Selecione sua função" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Vendedor">Vendedor</SelectItem>
                              <SelectItem value="Assistente Comercial">Assistente Comercial</SelectItem>
                              <SelectItem value="Recepção">Recepção</SelectItem>
                              <SelectItem value="Recursos Humanos">Recursos Humanos</SelectItem>
                              <SelectItem value="Gerência">Gerência</SelectItem>
                              <SelectItem value="Monitoria e Desempenho">Monitoria e Desempenho</SelectItem>
                              <SelectItem value="Outro">Outro</SelectItem>
                            </SelectContent>
                          </Select>
                        </FormControl>
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
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input 
                              placeholder="Senha" 
                              type={showPassword ? "text" : "password"} 
                              className="pl-10 h-10 bg-secondary/50 border-input input-focus" 
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
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <div className="relative">
                          <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                          <FormControl>
                            <Input 
                              placeholder="Confirmar senha" 
                              type={showPassword ? "text" : "password"} 
                              className="pl-10 h-10 bg-secondary/50 border-input input-focus" 
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
                    className="w-full shadow-sm" 
                    variant="gradient"
                    disabled={isLoading}
                  >
                    {isLoading ? 'Cadastrando...' : 'Cadastrar'}
                  </Button>
                </form>
              </Form>
            </TabsContent>
          </Tabs>
        </CardContent>
        
        <CardFooter className="flex justify-center border-t py-4 bg-secondary/20 text-muted-foreground">
          <p className="text-xs">
            RL Representações - SIGEM v1.0.0
          </p>
        </CardFooter>
      </Card>

      {/* Modal de recuperação de senha */}
      <Dialog open={isResetPasswordOpen} onOpenChange={setIsResetPasswordOpen}>
        <DialogContent className="sm:max-w-md bg-white/95 backdrop-blur-sm">
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
                      <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                      <FormControl>
                        <Input 
                          placeholder="Email" 
                          type="email" 
                          className="pl-10 h-10 bg-secondary/50 border-input input-focus" 
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
                  className="border-input"
                >
                  Cancelar
                </Button>
                <Button 
                  type="submit"
                  disabled={isLoading}
                  variant="gradient"
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
