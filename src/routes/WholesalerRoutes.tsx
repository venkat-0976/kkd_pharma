import { Routes, Route, Navigate } from "react-router-dom";
import { WholesalerLayout } from "@/components/layout/WholesalerLayout";
import { Dashboard } from "@/pages/wholesaler/Dashboard";
import { ProfilePage } from "@/pages/wholesaler/Profile/ProfilePage";
import { OwnersPage } from "@/pages/wholesaler/Owners/OwnersPage";
import { CompetentPersonPage } from "@/pages/wholesaler/CompetentPerson/CompetentPersonPage";
import { EmployeesPage } from "@/pages/wholesaler/Employees/EmployeesPage";
import { LicencesPage } from "@/pages/wholesaler/Licences/LicencesPage";
import { DocumentsPage } from "@/pages/wholesaler/Documents/DocumentsPage";
import { DirectoryPage } from "@/pages/wholesaler/Directory/DirectoryPage";
import { AlertsPage } from "@/pages/wholesaler/Alerts/AlertsPage";
import { SettingsPage } from "@/pages/wholesaler/Settings/SettingsPage";

export function WholesalerRoutes() {
  return (
    <Routes>
      <Route element={<WholesalerLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="owners" element={<OwnersPage />} />
        <Route path="competent-person" element={<CompetentPersonPage />} />
        <Route path="employees" element={<EmployeesPage />} />
        <Route path="licences" element={<LicencesPage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="directory" element={<DirectoryPage />} />
        <Route path="alerts" element={<AlertsPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/wholesaler" replace />} />
      </Route>
    </Routes>
  );
}

export default WholesalerRoutes;
