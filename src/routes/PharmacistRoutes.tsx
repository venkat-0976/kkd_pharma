import { Routes, Route, Navigate } from "react-router-dom";
import { PharmacistLayout } from "@/components/layout/PharmacistLayout";
import { Dashboard } from "@/pages/pharmacist/Dashboard";
import { ProfilePage } from "@/pages/pharmacist/Profile/ProfilePage";
import { DocumentsPage } from "@/pages/pharmacist/Documents/DocumentsPage";
import { EmploymentHistoryPage } from "@/pages/pharmacist/EmploymentHistory/EmploymentHistoryPage";
import { SettingsPage } from "@/pages/pharmacist/Settings/SettingsPage";

export function PharmacistRoutes() {
  return (
    <Routes>
      <Route element={<PharmacistLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="documents" element={<DocumentsPage />} />
        <Route path="employment-history" element={<EmploymentHistoryPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="*" element={<Navigate to="/pharmacist" replace />} />
      </Route>
    </Routes>
  );
}

export default PharmacistRoutes;
