import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authService } from "@/services/auth/auth.service";
import { WholesalerLayout } from "@/layouts/WholesalerLayout";

/**
 * Wholesaler portal gate.
 * Only Wholesaler accounts can access /wholesaler/* routes.
 */
export const Route = createFileRoute("/wholesaler")({
  ssr: false,
  beforeLoad: () => {
    const session = authService.getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.loginType !== "Wholesaler") throw redirect({ to: "/login" });
  },
  component: WholesalerLayout,
});
