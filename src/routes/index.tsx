import { Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "@/pages/public/HomePage";
import { AboutPage } from "@/pages/public/AboutPage";
import { ContactPage } from "@/pages/public/ContactPage";
import { ServicesPage } from "@/pages/public/ServicesPage";
import { JoinPage } from "@/pages/public/JoinPage";
import { RetailersPage } from "@/pages/public/RetailersPage";
import { WholesalersPage } from "@/pages/public/WholesalersPage";
import { BusinessDetailPage } from "@/pages/public/BusinessDetailPage";
import { LoginPage } from "@/pages/auth/LoginPage";
import { ForgotPasswordPage } from "@/pages/auth/ForgotPasswordPage";
import { RetailerRoutes } from "@/routes/RetailerRoutes";
import { WholesalerRoutes } from "@/routes/WholesalerRoutes";
import { PharmacistRoutes } from "@/routes/PharmacistRoutes";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/services" element={<ServicesPage />} />
      <Route path="/join" element={<JoinPage />} />
      <Route path="/retailers" element={<RetailersPage />} />
      <Route path="/retailers/:slug" element={<BusinessDetailPage type="Retailer" />} />
      <Route path="/wholesalers" element={<WholesalersPage />} />
      <Route path="/wholesalers/:slug" element={<BusinessDetailPage type="Wholesaler" />} />

      {/* Auth */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />

      {/* Role-based Portals */}
      <Route path="/retailer/*" element={<RetailerRoutes />} />
      <Route path="/wholesaler/*" element={<WholesalerRoutes />} />
      <Route path="/pharmacist/*" element={<PharmacistRoutes />} />

      {/* Backward Compatibility for legacy /member URLs */}
      <Route path="/member/*" element={<Navigate to="/retailer" replace />} />
      <Route path="/member" element={<Navigate to="/retailer" replace />} />

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default AppRoutes;
