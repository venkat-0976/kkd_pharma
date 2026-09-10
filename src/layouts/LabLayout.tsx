import { Outlet } from "@tanstack/react-router";
import { AuthenticatedPortalLayout } from "./AuthenticatedPortalLayout";
import { labNav } from "@/modules/lab/navigation/labNav";

export function LabLayout() {
  return (
    <AuthenticatedPortalLayout navItems={labNav} roleName="Laboratory portal" profileRoute="/lab">
      <Outlet />
    </AuthenticatedPortalLayout>
  );
}
