
import ClientTable from '../components/ClientTable';

const ClientsPage = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Gestão de Clientes</h1>
        <p className="text-muted-foreground">
          Visualize e gerencie sua carteira de clientes.
        </p>
      </div>
      
      <ClientTable />
    </div>
  );
};

export default ClientsPage;
