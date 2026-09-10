import { Outlet } from "react-router-dom";
import { AuthenticatedPortalLayout } from "./AuthenticatedPortalLayout";
import { labNav } from "@/modules/labNav";

export function LabLayout() {
  return (
    <AuthenticatedPortalLayout
      navItems={labNav}
      roleName="Diagnostic lab portal"
      profileRoute="/lab"
    >
      <Outlet />
    </AuthenticatedPortalLayout>
  );
}

export default LabLayout;
