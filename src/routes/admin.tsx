import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authService } from "@/services/auth/auth.service";
import { AdminShell } from "@/features/admin/AdminShell";

/**
 * Admin console gate. UI guard only — the backend must re-verify the ADMIN
 * role on every privileged read/write when it lands.
 */
export const Route = createFileRoute("/admin")({
  ssr: false,
  beforeLoad: () => {
    const session = authService.getSession();
    if (!session) throw redirect({ to: "/login" });
    if (session.role !== "ADMIN" && session.role !== "SUPER_ADMIN") {
      throw redirect({ to: "/member" });
    }
  },
  component: () => (
    <AdminShell>
      <Outlet />
    </AdminShell>
  ),
});
