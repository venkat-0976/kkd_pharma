import { createFileRoute, redirect } from "@tanstack/react-router";
import { authService } from "@/services/auth/auth.service";
import { HospitalLayout } from "@/layouts/HospitalLayout";

/**
 * Hospital portal gate.
 * Only Hospital accounts can access /hospital/* routes.
 */
export const Route = createFileRoute("/hospital")({
  ssr: false,
  beforeLoad: () => {
    const session = authService.getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.loginType !== "Hospital") throw redirect({ to: "/login" });
  },
  component: HospitalLayout,
});
