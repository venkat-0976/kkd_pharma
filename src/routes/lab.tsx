import { createFileRoute, redirect } from "@tanstack/react-router";
import { authService } from "@/services/auth/auth.service";
import { LabLayout } from "@/layouts/LabLayout";

/**
 * Lab portal gate.
 * Only Lab accounts can access /lab/* routes.
 */
export const Route = createFileRoute("/lab")({
  ssr: false,
  beforeLoad: () => {
    const session = authService.getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.loginType !== "Lab") throw redirect({ to: "/login" });
  },
  component: LabLayout,
});
