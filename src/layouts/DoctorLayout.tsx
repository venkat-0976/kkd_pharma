import { Outlet } from "@tanstack/react-router";
import { AuthenticatedPortalLayout } from "./AuthenticatedPortalLayout";
import { doctorNav } from "@/modules/doctor/navigation/doctorNav";

export function DoctorLayout() {
  return (
    <AuthenticatedPortalLayout
      navItems={doctorNav}
      roleName="Doctor portal"
      profileRoute="/doctor"
    >
      <Outlet />
    </AuthenticatedPortalLayout>
  );
}
