import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { BusinessProvider } from "@/contexts/BusinessContext";
import { AppRoutes } from "@/routes/index";
import { Toaster } from "@/components/ui/sonner";

export function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BusinessProvider>
          <AppRoutes />
          <Toaster richColors position="top-right" />
        </BusinessProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
