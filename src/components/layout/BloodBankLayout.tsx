import { Outlet } from "react-router-dom";
import { AuthenticatedPortalLayout } from "./AuthenticatedPortalLayout";
import { bloodBankNav } from "@/modules/bloodBankNav";

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

export default BloodBankLayout;
