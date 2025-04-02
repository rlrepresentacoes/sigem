
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import ModuleLayout from "@/components/layouts/ModuleLayout";
import PendingApprovalPage from "@/components/PendingApprovalPage";

// Pages
import LoginPage from "@/pages/LoginPage";
import NotFound from "./pages/NotFound";

// Module Pages
import VendasDashboard from "@/modules/vendas/views/Dashboard";
import ClientsPage from "@/modules/vendas/views/ClientsPage";
import AnalysisPage from "@/modules/vendas/views/AnalysisPage";
import GerenciaDashboard from "@/modules/gerencia/views/Dashboard";
import RecepcaoDashboard from "@/modules/recepcao/views/Dashboard";
import MonitoriasDashboard from "@/modules/monitorias/views/Dashboard";
import RHDashboard from "@/modules/rh/views/Dashboard";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Login Route */}
            <Route path="/" element={<LoginPage />} />
            
            {/* Approval Pending Route */}
            <Route path="/pending-approval" element={<PendingApprovalPage />} />
            
            {/* Vendas Module Routes */}
            <Route 
              path="/vendas" 
              element={
                <ModuleLayout requiredRole="vendas">
                  <VendasDashboard />
                </ModuleLayout>
              } 
            />
            <Route 
              path="/vendas/clientes" 
              element={
                <ModuleLayout requiredRole="vendas">
                  <ClientsPage />
                </ModuleLayout>
              } 
            />
            <Route 
              path="/vendas/analises" 
              element={
                <ModuleLayout requiredRole="vendas">
                  <AnalysisPage />
                </ModuleLayout>
              } 
            />
            
            {/* Gerencia Module Routes */}
            <Route 
              path="/gerencia" 
              element={
                <ModuleLayout requiredRole="gerencia">
                  <GerenciaDashboard />
                </ModuleLayout>
              } 
            />
            
            {/* Recepcao Module Routes */}
            <Route 
              path="/recepcao" 
              element={
                <ModuleLayout requiredRole="recepcao">
                  <RecepcaoDashboard />
                </ModuleLayout>
              } 
            />
            
            {/* Monitorias Module Routes */}
            <Route 
              path="/monitorias" 
              element={
                <ModuleLayout requiredRole="monitorias">
                  <MonitoriasDashboard />
                </ModuleLayout>
              } 
            />
            
            {/* RH Module Routes */}
            <Route 
              path="/rh" 
              element={
                <ModuleLayout requiredRole="rh">
                  <RHDashboard />
                </ModuleLayout>
              } 
            />
            
            {/* Not Found Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
