import { Outlet } from "react-router-dom";
import { AuthenticatedPortalLayout } from "./AuthenticatedPortalLayout";
import { doctorNav } from "@/modules/doctorNav";

export function DoctorLayout() {
  return (
    <AuthenticatedPortalLayout
      navItems={doctorNav}
      roleName="Doctor clinic portal"
      profileRoute="/doctor"
    >
      <Outlet />
    </AuthenticatedPortalLayout>
  );
}

export default DoctorLayout;
