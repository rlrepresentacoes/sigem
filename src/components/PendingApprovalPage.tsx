
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { LogOut } from "lucide-react";

const PendingApprovalPage = () => {
  const { user, logout } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-sigem-dark-blue via-[#1b2033] to-[#232643] flex flex-col justify-center items-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-amber-600">
            <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
            <line x1="12" y1="9" x2="12" y2="13"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
          </svg>
        </div>
        
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Aprovação Pendente</h2>
        
        <p className="text-gray-600 mb-6">
          Olá, {user?.name}! Sua conta foi criada com sucesso, mas o acesso está pendente de aprovação administrativa. Por favor, entre em contato com um administrador para liberar seu acesso.
        </p>
        
        <Button 
          variant="outline" 
          onClick={logout}
          className="w-full flex items-center justify-center"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Sair
        </Button>
      </div>
    </div>
  );
};

export default PendingApprovalPage;
