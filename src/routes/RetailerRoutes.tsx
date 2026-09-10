import { Routes, Route, Navigate } from "react-router-dom";
import { RetailerLayout } from "@/components/layout/RetailerLayout";
import { Dashboard } from "@/pages/retailer/Dashboard";
import { ProfilePage } from "@/pages/retailer/Profile/ProfilePage";
import { OwnersPage } from "@/pages/retailer/Owners/OwnersPage";
import { PharmacistsPage } from "@/pages/retailer/Pharmacists/PharmacistsPage";
import { EmployeesPage } from "@/pages/retailer/Employees/EmployeesPage";
import { LicencesPage } from "@/pages/retailer/Licences/LicencesPage";
import { DocumentsPage } from "@/pages/retailer/Documents/DocumentsPage";
import { DirectoryPage } from "@/pages/retailer/Directory/DirectoryPage";
import { AlertsPage } from "@/pages/retailer/Alerts/AlertsPage";
import { SettingsPage } from "@/pages/retailer/Settings/SettingsPage";

export function RetailerRoutes() {
  return (
    <Routes>
      <Route element={<RetailerLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="owners" element={<OwnersPage />} />
        <Route path="pharmacists" element={<PharmacistsPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="licences" element={<LicencesPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="directory" element={<DirectoryPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/retailer" replace />} />
      </Route>
    </Routes>
  );
}

export default RetailerRoutes;
