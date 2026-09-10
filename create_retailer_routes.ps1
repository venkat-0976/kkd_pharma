# retailer.owners.tsx
$retailerOwners = @'
import { createFileRoute } from "@tanstack/react-router";
import { OwnersPage } from "@/modules/retailer/pages/Owners/OwnersPage";

export const Route = createFileRoute("/retailer/owners")({
  head: () => ({
    meta: [
      { title: "Owners & Partners — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnersPage,
});
'@
Set-Content "src\routes\retailer.owners.tsx" $retailerOwners -NoNewline

# retailer.licences.tsx
$retailerLicences = @'
import { createFileRoute } from "@tanstack/react-router";
import { LicencesPage } from "@/modules/retailer/pages/Licences/LicencesPage";

export const Route = createFileRoute("/retailer/licences")({
  head: () => ({
    meta: [
      { title: "Licences — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LicencesPage,
});
'@
Set-Content "src\routes\retailer.licences.tsx" $retailerLicences -NoNewline

# retailer.documents.tsx
$retailerDocuments = @'
import { createFileRoute } from "@tanstack/react-router";
import { DocumentsPage } from "@/modules/retailer/pages/Documents/DocumentsPage";

export const Route = createFileRoute("/retailer/documents")({
  head: () => ({
    meta: [
      { title: "Documents — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DocumentsPage,
});
'@
Set-Content "src\routes\retailer.documents.tsx" $retailerDocuments -NoNewline

# retailer.pharmacists.tsx
$retailerPharmacists = @'
import { createFileRoute } from "@tanstack/react-router";
import { PharmacistsPage } from "@/modules/retailer/pages/Pharmacists/PharmacistsPage";

export const Route = createFileRoute("/retailer/pharmacists")({
  head: () => ({
    meta: [
      { title: "Pharmacists — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PharmacistsPage,
});
'@
Set-Content "src\routes\retailer.pharmacists.tsx" $retailerPharmacists -NoNewline

# retailer.employees.tsx
$retailerEmployees = @'
import { createFileRoute } from "@tanstack/react-router";
import { EmployeesPage } from "@/modules/retailer/pages/Employees/EmployeesPage";

export const Route = createFileRoute("/retailer/employees")({
  head: () => ({
    meta: [
      { title: "Employees — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeesPage,
});
'@
Set-Content "src\routes\retailer.employees.tsx" $retailerEmployees -NoNewline

# retailer.alerts.tsx
$retailerAlerts = @'
import { createFileRoute } from "@tanstack/react-router";
import { AlertsPage } from "@/modules/retailer/pages/Alerts/AlertsPage";

export const Route = createFileRoute("/retailer/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AlertsPage,
});
'@
Set-Content "src\routes\retailer.alerts.tsx" $retailerAlerts -NoNewline

# retailer.settings.tsx
$retailerSettings = @'
import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/modules/retailer/pages/Settings/SettingsPage";

export const Route = createFileRoute("/retailer/settings")({
  head: () => ({
    meta: [
      { title: "Settings — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SettingsPage,
});
'@
Set-Content "src\routes\retailer.settings.tsx" $retailerSettings -NoNewline

Write-Output "Retailer routes created."
