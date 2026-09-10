import { Outlet } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";

export function WebsiteLayout() {
  return (
    <PublicLayout>
      <Outlet />
    </PublicLayout>
  );
}

export default WebsiteLayout;
