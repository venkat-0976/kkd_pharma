import { Outlet } from "@tanstack/react-router";
import { AuthenticatedPortalLayout } from "./AuthenticatedPortalLayout";
import { hospitalNav } from "@/modules/hospital/navigation/hospitalNav";

export function HospitalLayout() {
  return (
    <AuthenticatedPortalLayout
      navItems={hospitalNav}
      roleName="Hospital portal"
      profileRoute="/hospital"
    >
      <Outlet />
    </AuthenticatedPortalLayout>
  );
}
