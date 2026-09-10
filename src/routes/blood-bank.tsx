import { createFileRoute, redirect } from "@tanstack/react-router";
import { authService } from "@/services/auth/auth.service";
import { BloodBankLayout } from "@/layouts/BloodBankLayout";

/**
 * Blood bank portal gate.
 * Only Blood bank accounts can access /blood-bank/* routes.
 */
export const Route = createFileRoute("/blood-bank")({
  ssr: false,
  beforeLoad: () => {
    const session = authService.getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.loginType !== "Blood bank") throw redirect({ to: "/login" });
  },
  component: BloodBankLayout,
});
