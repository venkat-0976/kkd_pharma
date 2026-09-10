import { Outlet } from "@tanstack/react-router";
import { AuthenticatedPortalLayout } from "./AuthenticatedPortalLayout";
import { wholesalerNav, wholesalerMobileNav } from "@/modules/wholesaler/navigation/wholesalerNav";

export function WholesalerLayout() {
  return (
    <AuthenticatedPortalLayout
      navItems={wholesalerNav}
      mobileNavItems={wholesalerMobileNav}
      roleName="Wholesaler portal"
      profileRoute="/wholesaler/profile"
      settingsRoute="/wholesaler/settings"
      alertsRoute="/wholesaler/alerts"
    >
      <Outlet />
    </AuthenticatedPortalLayout>
  );
}
