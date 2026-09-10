import { Outlet } from "react-router-dom";
import { AuthenticatedPortalLayout } from "./AuthenticatedPortalLayout";
import { hospitalNav } from "@/modules/hospitalNav";

export function HospitalLayout() {
  return (
    <AuthenticatedPortalLayout
      navItems={hospitalNav}
      roleName="Hospital pharmacy portal"
      profileRoute="/hospital"
    >
      <Outlet />
    </AuthenticatedPortalLayout>
  );
}

export default HospitalLayout;
