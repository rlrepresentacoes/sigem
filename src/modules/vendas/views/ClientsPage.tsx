
import { PlusCircle, Filter, Download, Search } from 'lucide-react';
import { useState } from 'react';
import ClientTable from '../components/ClientTable';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';

const ClientsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string | undefined>(undefined);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gradient">Gestão de Clientes</h1>
          <p className="text-muted-foreground mt-1">
            Visualize e gerencie sua carteira de clientes de forma eficiente.
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="flex items-center gap-2 shadow-button hover:shadow-none transition-all">
                <Filter className="h-4 w-4" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent className="border-l border-sigem-blue/10 backdrop-blur-sm">
              <SheetHeader>
                <SheetTitle className="text-gradient">Filtros Avançados</SheetTitle>
                <SheetDescription>
                  Configure filtros para encontrar clientes específicos.
                </SheetDescription>
              </SheetHeader>
              <div className="grid gap-6 py-6">
                <div className="space-y-2">
                  <Label htmlFor="status" className="font-medium">Status</Label>
                  <Select onValueChange={val => setSelectedFilter(val)}>
                    <SelectTrigger id="status" className="shadow-button bg-white">
                      <SelectValue placeholder="Selecione um status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="active">Ativo</SelectItem>
                      <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="group" className="font-medium">Grupo</Label>
                  <Select>
                    <SelectTrigger id="group" className="shadow-button bg-white">
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
                
                <Separator />
                
                <div className="space-y-2">
                  <Label htmlFor="period" className="font-medium">Período sem compras</Label>
                  <Select>
                    <SelectTrigger id="period" className="shadow-button bg-white">
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
              </div>
              <SheetFooter>
                <SheetClose asChild>
                  <Button 
                    type="submit" 
                    className="bg-gradient-to-r from-sigem-blue to-sigem-indigo hover:from-sigem-indigo hover:to-sigem-purple transition-all duration-300"
                  >
                    Aplicar Filtros
                  </Button>
                </SheetClose>
              </SheetFooter>
            </SheetContent>
          </Sheet>
          
          <Button variant="outline" className="flex items-center gap-2 shadow-button hover:shadow-none transition-all">
            <Download className="h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>
      
      <Card className="overflow-hidden border-none shadow-md rounded-xl">
        <CardHeader className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-4">
          <CardTitle className="text-lg font-medium flex items-center justify-between">
            <span>Carteira de Clientes</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="p-4 border-b">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Buscar por razão social, grupo, fornecedor..." 
                value={searchTerm} 
                onChange={handleSearchChange} 
                className="pl-10 shadow-button bg-white focus-visible:ring-sigem-blue"
              />
            </div>
          </div>
          <ClientTable searchTerm={searchTerm} statusFilter={selectedFilter} />
        </CardContent>
      </Card>
    </div>
  );
};

export default ClientsPage;
