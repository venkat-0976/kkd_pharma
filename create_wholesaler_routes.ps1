$routes = @{
  "wholesaler.index.tsx" = @'
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/wholesaler/")({
  beforeLoad: () => { throw redirect({ to: "/wholesaler/profile" }); },
});
'@

  "wholesaler.profile.tsx" = @'
import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/modules/wholesaler/pages/Profile/ProfilePage";

export const Route = createFileRoute("/wholesaler/profile")({
  head: () => ({ meta: [{ title: "Profile — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: ProfilePage,
});
'@

  "wholesaler.owners.tsx" = @'
import { createFileRoute } from "@tanstack/react-router";
import { OwnersPage } from "@/modules/wholesaler/pages/Owners/OwnersPage";

export const Route = createFileRoute("/wholesaler/owners")({
  head: () => ({ meta: [{ title: "Owners — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: OwnersPage,
});
'@

  "wholesaler.licences.tsx" = @'
import { createFileRoute } from "@tanstack/react-router";
import { LicencesPage } from "@/modules/wholesaler/pages/Licences/LicencesPage";

export const Route = createFileRoute("/wholesaler/licences")({
  head: () => ({ meta: [{ title: "Licences — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: LicencesPage,
});
'@

  "wholesaler.documents.tsx" = @'
import { createFileRoute } from "@tanstack/react-router";
import { DocumentsPage } from "@/modules/wholesaler/pages/Documents/DocumentsPage";

export const Route = createFileRoute("/wholesaler/documents")({
  head: () => ({ meta: [{ title: "Documents — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: DocumentsPage,
});
'@

  "wholesaler.pharmacists.tsx" = @'
import { createFileRoute } from "@tanstack/react-router";
import { PharmacistsPage } from "@/modules/wholesaler/pages/Pharmacists/PharmacistsPage";

export const Route = createFileRoute("/wholesaler/pharmacists")({
  head: () => ({ meta: [{ title: "Pharmacists — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: PharmacistsPage,
});
'@

  "wholesaler.employees.tsx" = @'
import { createFileRoute } from "@tanstack/react-router";
import { EmployeesPage } from "@/modules/wholesaler/pages/Employees/EmployeesPage";

export const Route = createFileRoute("/wholesaler/employees")({
  head: () => ({ meta: [{ title: "Employees — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: EmployeesPage,
});
'@

  "wholesaler.alerts.tsx" = @'
import { createFileRoute } from "@tanstack/react-router";
import { AlertsPage } from "@/modules/wholesaler/pages/Alerts/AlertsPage";

export const Route = createFileRoute("/wholesaler/alerts")({
  head: () => ({ meta: [{ title: "Alerts — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: AlertsPage,
});
'@

  "wholesaler.settings.tsx" = @'
import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/modules/wholesaler/pages/Settings/SettingsPage";

export const Route = createFileRoute("/wholesaler/settings")({
  head: () => ({ meta: [{ title: "Settings — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: SettingsPage,
});
'@
}

foreach ($fileName in $routes.Keys) {
  Set-Content "src\routes\$fileName" $routes[$fileName] -NoNewline
  Write-Output "Created: $fileName"
}
