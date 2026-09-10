import { Outlet } from "@tanstack/react-router";
import { AuthenticatedPortalLayout } from "./AuthenticatedPortalLayout";
import { bloodBankNav } from "@/modules/blood-bank/navigation/bloodBankNav";

export function BloodBankLayout() {
  return (
    <AuthenticatedPortalLayout
      navItems={bloodBankNav}
      roleName="Blood bank portal"
      profileRoute="/blood-bank"
    >
      <Outlet />
    </AuthenticatedPortalLayout>
  );
}
