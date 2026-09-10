import { createFileRoute, redirect } from "@tanstack/react-router";
import { authService } from "@/services/auth/auth.service";
import { DoctorLayout } from "@/layouts/DoctorLayout";

/**
 * Doctor portal gate.
 * Only Doctor accounts can access /doctor/* routes.
 */
export const Route = createFileRoute("/doctor")({
  ssr: false,
  beforeLoad: () => {
    const session = authService.getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.loginType !== "Doctor") throw redirect({ to: "/login" });
  },
  component: DoctorLayout,
});
