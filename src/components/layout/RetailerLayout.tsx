import { Outlet } from "react-router-dom";
import { AuthenticatedPortalLayout } from "./AuthenticatedPortalLayout";
import { retailerNav, retailerMobileNav } from "@/modules/retailer/navigation/retailerNav";

export function RetailerLayout() {
  return (
    <AuthenticatedPortalLayout
      navItems={retailerNav}
      mobileNavItems={retailerMobileNav}
      roleName="Retailer portal"
      profileRoute="/retailer/profile"
      settingsRoute="/retailer/settings"
      alertsRoute="/retailer/alerts"
    >
      <Outlet />
    </AuthenticatedPortalLayout>
  );
}
