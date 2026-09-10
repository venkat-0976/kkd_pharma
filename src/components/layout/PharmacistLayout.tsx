import { Outlet } from "react-router-dom";
import { AuthenticatedPortalLayout } from "@/layouts/AuthenticatedPortalLayout";
import { pharmacistNav, pharmacistMobileNav } from "@/modules/pharmacist/navigation/pharmacistNav";

export function PharmacistLayout() {
  return (
    <AuthenticatedPortalLayout
      navItems={pharmacistNav}
      mobileNavItems={pharmacistMobileNav}
      roleName="Pharmacist portal"
      profileRoute="/pharmacist/profile"
      settingsRoute="/pharmacist/settings"
      alertsRoute="/pharmacist/settings"
    >
      <Outlet />
    </AuthenticatedPortalLayout>
  );
}

export default PharmacistLayout;
