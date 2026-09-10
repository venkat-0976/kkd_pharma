import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authService } from "@/services/auth/auth.service";
import { RetailerLayout } from "@/layouts/RetailerLayout";

/**
 * Retailer portal gate.
 * Only Retailer accounts can access /retailer/* routes.
 */
export const Route = createFileRoute("/retailer")({
  ssr: false,
  beforeLoad: () => {
    const session = authService.getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.loginType !== "Retailer") throw redirect({ to: "/login" });
  },
  component: RetailerLayout,
});
