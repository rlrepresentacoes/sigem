
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, User, UserPlus } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(1, 'Senha é obrigatória')
});

const signupSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  surname: z.string().min(1, 'Sobrenome é obrigatório'),
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  jobTitle: z.string().optional()
});

type LoginFormValues = z.infer<typeof loginSchema>;
type SignupFormValues = z.infer<typeof signupSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('login');
  const { login, signUp, isLoading } = useAuth();
  
  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const signupForm = useForm<SignupFormValues>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      surname: '',
      email: '',
      password: '',
      jobTitle: '',
    },
  });

  const handleLoginSubmit = async (data: LoginFormValues) => {
    await login(data.email, data.password);
  };

  const handleSignupSubmit = async (data: SignupFormValues) => {
    await signUp(data.email, data.password, { 
      name: data.name, 
      surname: data.surname,
      jobTitle: data.jobTitle 
    });
    setActiveTab('login');
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Card className="w-full shadow-xl border-0 bg-white/95 backdrop-blur-sm">
      <CardHeader className="space-y-1 text-center pb-2">
        <div className="mx-auto mb-2 flex h-20 w-20 items-center justify-center rounded-full bg-sigem-dark-blue">
          <span className="text-2xl font-bold text-white">S</span>
        </div>
        <CardTitle className="text-2xl font-bold tracking-tight text-sigem-dark-blue">SIGEM</CardTitle>
        <p className="text-sm text-gray-500">Sistema de Gestão Empresarial Modular</p>
      </CardHeader>
      
      <CardContent className="pt-4">
        <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Entrar</TabsTrigger>
            <TabsTrigger value="signup">Cadastrar</TabsTrigger>
          </TabsList>
          
          <TabsContent value="login">
            <Form {...loginForm}>
              <form onSubmit={loginForm.handleSubmit(handleLoginSubmit)} className="space-y-4 mt-4">
                <FormField
                  control={loginForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <div className="relative">
                        <User className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                        <FormControl>
                          <Input 
                            placeholder="Email" 
                            type="email" 
                            className="pl-10" 
                            {...field} 
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
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-1 top-1" 
                          onClick={togglePasswordVisibility}
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
              <form onSubmit={signupForm.handleSubmit(handleSignupSubmit)} className="space-y-4 mt-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={signupForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nome</FormLabel>
                        <FormControl>
                          <Input placeholder="Nome" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <FormField
                    control={signupForm.control}
                    name="surname"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sobrenome</FormLabel>
                        <FormControl>
                          <Input placeholder="Sobrenome" {...field} />
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
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input placeholder="seu@email.com" type="email" {...field} />
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
                      <FormLabel>Senha</FormLabel>
                      <div className="relative">
                        <FormControl>
                          <Input 
                            placeholder="******" 
                            type={showPassword ? "text" : "password"} 
                            className="pr-10" 
                            {...field} 
                          />
                        </FormControl>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-1 top-1" 
                          onClick={togglePasswordVisibility}
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
                  name="jobTitle"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Função (opcional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Sua função na empresa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <Button 
                  type="submit" 
                  className="w-full bg-sigem-dark-blue hover:bg-opacity-90" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    'Cadastrando...'
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Cadastrar
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </TabsContent>
        </Tabs>
      </CardContent>
      
      <CardFooter className="flex justify-center border-t pt-4">
        <p className="text-xs text-gray-500">
          {activeTab === 'login' ? 
            'Novos cadastros precisam de aprovação administrativa' : 
            'Seu acesso estará sujeito à aprovação administrativa'}
        </p>
      </CardFooter>
    </Card>
  );
};

export default LoginForm;
