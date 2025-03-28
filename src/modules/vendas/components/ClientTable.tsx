
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Search, Calendar, PlusCircle } from 'lucide-react';

// Mock client data
const mockClients = [
  {
    id: 1,
    razaoSocial: 'Empresa ABC Ltda',
    grupo: 'Varejo',
    fornecedores: 'Fornecedor X, Y',
    ultimoPedido: '2023-10-15',
    status: 'Ativo',
    mesesSemCompras: 4,
    projecao: 'Alta',
    responsavel: 'DAVIDDAMASCENO'
  },
  {
    id: 2,
    razaoSocial: 'Distribuidora XYZ',
    grupo: 'Atacado',
    fornecedores: 'Fornecedor Z',
    ultimoPedido: '2023-11-20',
    status: 'Inativo',
    mesesSemCompras: 3,
    projecao: 'Média',
    responsavel: 'DAVIDDAMASCENO'
  },
  {
    id: 3,
    razaoSocial: 'Comércio 123',
    grupo: 'Varejo',
    fornecedores: 'Fornecedor A, B, C',
    ultimoPedido: '2023-12-01',
    status: 'Ativo',
    mesesSemCompras: 2,
    projecao: 'Baixa',
    responsavel: 'DAVIDDAMASCENO'
  },
  {
    id: 4,
    razaoSocial: 'Indústria 456',
    grupo: 'Indústria',
    fornecedores: 'Fornecedor D',
    ultimoPedido: '2023-08-10',
    status: 'Ativo',
    mesesSemCompras: 6,
    projecao: 'Média',
    responsavel: 'OUTRORESPONSAVEL'
  }
];

const ClientTable = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredClients, setFilteredClients] = useState(mockClients);

  useEffect(() => {
    // Filter clients by the responsible person name (user's responsibleName)
    // and by search term if any
    const filtered = mockClients.filter(client => 
      client.responsavel === user?.responsibleName &&
      (searchTerm === '' || 
       client.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
       client.grupo.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    
    setFilteredClients(filtered);
  }, [searchTerm, user?.responsibleName]);

  // Function to determine status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ativo':
        return <Badge className="bg-green-500">{status}</Badge>;
      case 'inativo':
        return <Badge variant="secondary">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Function to determine month warning based on months without purchases
  const getMonthsWarning = (months: number) => {
    if (months >= 6) {
      return <Badge variant="destructive">{months} meses</Badge>;
    } else if (months >= 3) {
      return <Badge variant="default" className="bg-amber-500">{months} meses</Badge>;
    } else {
      return <span>{months} meses</span>;
    }
  };

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Clientes</CardTitle>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Buscar cliente..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button className="bg-sigem-dark-blue">
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Cliente
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Razão Social</TableHead>
                <TableHead>Grupo</TableHead>
                <TableHead>Fornecedores</TableHead>
                <TableHead>Último Pedido</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Meses sem Compras</TableHead>
                <TableHead>Projeção</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredClients.length > 0 ? (
                filteredClients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell>{client.id}</TableCell>
                    <TableCell className="font-medium">{client.razaoSocial}</TableCell>
                    <TableCell>{client.grupo}</TableCell>
                    <TableCell>{client.fornecedores}</TableCell>
                    <TableCell>{client.ultimoPedido}</TableCell>
                    <TableCell>{getStatusBadge(client.status)}</TableCell>
                    <TableCell>{getMonthsWarning(client.mesesSemCompras)}</TableCell>
                    <TableCell>{client.projecao}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Calendar className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    Nenhum cliente encontrado
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClientTable;
