
import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar, Eye, Edit, MoreHorizontal, PhoneCall, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { 
  HoverCard, 
  HoverCardContent, 
  HoverCardTrigger 
} from '@/components/ui/hover-card';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

// Mock client data
const mockClients = [
  {
    id: 1,
    razaoSocial: 'Empresa ABC Ltda',
    grupo: 'Varejo',
    fornecedores: 'Fornecedor X, Y',
    ultimoPedido: '15/10/2023',
    status: 'Ativo',
    mesesSemCompras: 4,
    projecao: 'Alta',
    responsavel: 'DAVIDDAMASCENO',
    email: 'contato@empresaabc.com.br',
    telefone: '(11) 3456-7890',
    endereco: 'Av. Paulista, 1000 - São Paulo/SP'
  },
  {
    id: 2,
    razaoSocial: 'Distribuidora XYZ',
    grupo: 'Atacado',
    fornecedores: 'Fornecedor Z',
    ultimoPedido: '20/11/2023',
    status: 'Inativo',
    mesesSemCompras: 3,
    projecao: 'Média',
    responsavel: 'DAVIDDAMASCENO',
    email: 'contato@distribuidoraxyz.com.br',
    telefone: '(11) 2345-6789',
    endereco: 'Rua Augusta, 500 - São Paulo/SP'
  },
  {
    id: 3,
    razaoSocial: 'Comércio 123',
    grupo: 'Varejo',
    fornecedores: 'Fornecedor A, B, C',
    ultimoPedido: '01/12/2023',
    status: 'Ativo',
    mesesSemCompras: 2,
    projecao: 'Baixa',
    responsavel: 'DAVIDDAMASCENO',
    email: 'contato@comercio123.com.br',
    telefone: '(11) 9876-5432',
    endereco: 'Rua Oscar Freire, 300 - São Paulo/SP'
  },
  {
    id: 4,
    razaoSocial: 'Indústria 456',
    grupo: 'Indústria',
    fornecedores: 'Fornecedor D',
    ultimoPedido: '10/08/2023',
    status: 'Ativo',
    mesesSemCompras: 6,
    projecao: 'Média',
    responsavel: 'OUTRORESPONSAVEL',
    email: 'contato@industria456.com.br',
    telefone: '(11) 8765-4321',
    endereco: 'Av. Industrial, 200 - Santo André/SP'
  }
];

interface ClientTableProps {
  searchTerm?: string;
  statusFilter?: string;
}

const ClientTable = ({ searchTerm = '', statusFilter }: ClientTableProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [filteredClients, setFilteredClients] = useState(mockClients);

  useEffect(() => {
    // Filter clients by the responsible person name (user's responsibleName)
    // and by search term if any, and by status filter if any
    const filtered = mockClients.filter(client => {
      // Filter by responsible name
      const isResponsibleMatch = client.responsavel === user?.responsibleName;
      
      // Filter by search term
      const isSearchMatch = searchTerm === '' || 
        client.razaoSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.grupo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.fornecedores.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Filter by status
      let isStatusMatch = true;
      if (statusFilter) {
        if (statusFilter === 'active') {
          isStatusMatch = client.status.toLowerCase() === 'ativo';
        } else if (statusFilter === 'inactive') {
          isStatusMatch = client.status.toLowerCase() === 'inativo';
        }
      }
      
      return isResponsibleMatch && isSearchMatch && isStatusMatch;
    });
    
    setFilteredClients(filtered);
  }, [searchTerm, statusFilter, user?.responsibleName]);

  // Function to determine status badge color
  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ativo':
        return <Badge className="bg-green-500 hover:bg-green-600">{status}</Badge>;
      case 'inativo':
        return <Badge variant="secondary" className="bg-slate-400 hover:bg-slate-500 text-white">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Function to determine month warning based on months without purchases
  const getMonthsWarning = (months: number) => {
    if (months >= 6) {
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Badge variant="destructive" className="cursor-help flex gap-1 items-center">
              <AlertTriangle className="h-3 w-3" />
              {months} meses
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Alerta de Inatividade</h4>
              <p className="text-sm">
                Este cliente não realiza compras há {months} meses. Considere entrar em contato para reativação.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    } else if (months >= 3) {
      return (
        <HoverCard>
          <HoverCardTrigger asChild>
            <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 cursor-help">
              {months} meses
            </Badge>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">Atenção</h4>
              <p className="text-sm">
                Este cliente está há {months} meses sem compras. Considere fazer um contato de acompanhamento.
              </p>
            </div>
          </HoverCardContent>
        </HoverCard>
      );
    } else {
      return <span className="text-gray-600">{months} meses</span>;
    }
  };

  const handleScheduleClick = () => {
    toast({
      title: "Agendamento iniciado",
      description: "Iniciando processo de agendamento de visita ao cliente.",
    });
  };

  return (
    <div className="rounded-md">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50 hover:bg-slate-50">
            <TableHead className="font-semibold">ID</TableHead>
            <TableHead className="font-semibold">Razão Social</TableHead>
            <TableHead className="font-semibold">Grupo</TableHead>
            <TableHead className="font-semibold">Fornecedores</TableHead>
            <TableHead className="font-semibold">Último Pedido</TableHead>
            <TableHead className="font-semibold">Status</TableHead>
            <TableHead className="font-semibold">Meses sem Compras</TableHead>
            <TableHead className="font-semibold">Projeção</TableHead>
            <TableHead className="font-semibold text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredClients.length > 0 ? (
            filteredClients.map((client) => (
              <TableRow key={client.id} className="group transition-colors">
                <TableCell className="font-medium">{client.id}</TableCell>
                <TableCell>
                  <div className="font-medium">{client.razaoSocial}</div>
                  <div className="text-xs text-muted-foreground mt-1">{client.email}</div>
                </TableCell>
                <TableCell>{client.grupo}</TableCell>
                <TableCell>
                  <div className="max-w-[150px] truncate" title={client.fornecedores}>
                    {client.fornecedores}
                  </div>
                </TableCell>
                <TableCell>{client.ultimoPedido}</TableCell>
                <TableCell>{getStatusBadge(client.status)}</TableCell>
                <TableCell>{getMonthsWarning(client.mesesSemCompras)}</TableCell>
                <TableCell>
                  <Badge 
                    className={
                      client.projecao === 'Alta' 
                        ? 'bg-blue-500 hover:bg-blue-600' 
                        : client.projecao === 'Média'
                        ? 'bg-orange-500 hover:bg-orange-600'
                        : 'bg-gray-500 hover:bg-gray-600'
                    }
                  >
                    {client.projecao}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex justify-end items-center gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={handleScheduleClick}
                    >
                      <Calendar className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => {
                        toast({
                          title: "Ligação iniciada",
                          description: `Iniciando ligação para ${client.razaoSocial}`,
                        });
                      }}
                    >
                      <PhoneCall className="h-4 w-4" />
                    </Button>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button 
                          variant="ghost" 
                          size="icon"
                          className="opacity-70 group-hover:opacity-100 transition-opacity"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-56" align="end">
                        <div className="grid gap-1">
                          <Button variant="ghost" className="justify-start" size="sm">
                            <Eye className="mr-2 h-4 w-4" />
                            Ver detalhes
                          </Button>
                          <Button variant="ghost" className="justify-start" size="sm">
                            <Edit className="mr-2 h-4 w-4" />
                            Editar cliente
                          </Button>
                          <Button variant="ghost" className="justify-start text-red-600 hover:text-red-700 hover:bg-red-100" size="sm">
                            <AlertTriangle className="mr-2 h-4 w-4" />
                            Marcar inativo
                          </Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-10 text-muted-foreground">
                <div className="flex flex-col items-center gap-2">
                  <AlertTriangle className="h-10 w-10 text-muted-foreground/70" />
                  <p>Nenhum cliente encontrado</p>
                  <p className="text-sm text-muted-foreground">Tente ajustar os filtros de busca</p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ClientTable;
