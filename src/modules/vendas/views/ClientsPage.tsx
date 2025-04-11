
import { PlusCircle, Filter, Download, Search, RefreshCw, UserPlus, ArrowUpDown, Calendar, ArrowDown, SlidersHorizontal, UserRound, FileText } from 'lucide-react';
import { useState } from 'react';
import ClientTable from '../components/ClientTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(undefined);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-sigem-text-primary">Gestão de Clientes</h1>
          <p className="text-sigem-text-secondary mt-1">
            Visualize e gerencie sua carteira de clientes de forma eficiente.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="soft" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            <span className="hidden sm:inline">Atualizar</span>
          </Button>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="soft" className="flex items-center gap-2">
                <SlidersHorizontal className="h-4 w-4" />
                <span className="hidden sm:inline">Filtros</span>
              </Button>
            </SheetTrigger>
            <SheetContent className="border-l">
              <SheetHeader className="pb-5">
                <SheetTitle>Filtros Avançados</SheetTitle>
                <SheetDescription>
                  Configure filtros para encontrar clientes específicos.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-5 py-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select onValueChange={val => setSelectedFilter(val)}>
                    <SelectTrigger id="status" className="h-10 bg-secondary/50 border-input focus:border-primary focus:ring-primary/20">
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="group">Grupo</Label>
                  <Select>
                    <SelectTrigger id="group" className="h-10 bg-secondary/50 border-input focus:border-primary focus:ring-primary/20">
                      <SelectValue placeholder="Selecione um grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="varejo">Varejo</SelectItem>
                      <SelectItem value="atacado">Atacado</SelectItem>
                      <SelectItem value="industria">Indústria</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="period">Período sem compras</Label>
                  <Select>
                    <SelectTrigger id="period" className="h-10 bg-secondary/50 border-input focus:border-primary focus:ring-primary/20">
                      <SelectValue placeholder="Selecione um período" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="3">3+ meses</SelectItem>
                      <SelectItem value="6">6+ meses</SelectItem>
                      <SelectItem value="12">12+ meses</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="date-range">Intervalo de datas</Label>
                  <div className="grid grid-cols-2 gap-3">
                    <Input type="date" className="h-10 bg-secondary/50 border-input focus:border-primary focus:ring-primary/20" />
                    <Input type="date" className="h-10 bg-secondary/50 border-input focus:border-primary focus:ring-primary/20" />
                  </div>
                </div>
              </div>
              <SheetFooter className="pt-5">
                <Button variant="outline" className="border-input">
                  Limpar filtros
                </Button>
                <SheetClose asChild>
                  <Button variant="gradient">Aplicar Filtros</Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          <Button variant="default" className="gap-2">
            <UserPlus className="h-4 w-4" />
            <span className="hidden sm:inline">Novo Cliente</span>
          </Button>
        </div>
      </div>
      
      <Card className="shadow-sm border overflow-hidden">
        <CardHeader className="p-5 pb-0">
          <Tabs defaultValue="all" className="w-full">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-4">
              <TabsList className="bg-secondary p-1 rounded-lg">
                <TabsTrigger value="all" className="text-sm rounded-md data-[state=active]:bg-white">Todos</TabsTrigger>
                <TabsTrigger value="active" className="text-sm rounded-md data-[state=active]:bg-white">Ativos</TabsTrigger>
                <TabsTrigger value="inactive" className="text-sm rounded-md data-[state=active]:bg-white">Inativos</TabsTrigger>
              </TabsList>
              
              <div className="relative w-full sm:w-auto sm:min-w-[300px]">
                <Search className="absolute left-3 top-2.5 h-4 w-4 text-sigem-text-secondary/70" />
                <Input 
                  placeholder="Buscar por razão social, grupo, fornecedor..." 
                  value={searchTerm} 
                  onChange={handleSearchChange} 
                  className="pl-10 h-10 bg-secondary/30 border-input focus:border-primary focus:ring-primary/20"
                />
              </div>
            </div>
            
            <TabsContent value="all">
              <ClientTable searchTerm={searchTerm} statusFilter={selectedFilter} />
            </TabsContent>
            <TabsContent value="active">
              <ClientTable searchTerm={searchTerm} statusFilter="active" />
            </TabsContent>
            <TabsContent value="inactive">
              <ClientTable searchTerm={searchTerm} statusFilter="inactive" />
            </TabsContent>
          </Tabs>
        </CardHeader>
      </Card>
    </div>
  );
};

export default ClientsPage;
