import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { authService } from "@/services/auth/auth.service";
import { MemberShell } from "@/features/member/MemberShell";

/**
 * Protected member area gate.
 *
 * Every /member/* route sits under this layout. Unauthenticated visitors are
 * redirected to /login before any private component renders.
 *
 * IMPORTANT: this is a UI guard only. When the backend lands, every private
 * read/write must re-verify authentication AND ownership on the server so
 * member A can never fetch member B's records by changing an id.
 */
export const Route = createFileRoute("/member")({
  ssr: false,
  beforeLoad: () => {
    if (!authService.getSession()) {
      throw redirect({ to: "/login" });
    }
  },
  component: () => (
    <MemberShell>
      <Outlet />
    </MemberShell>
  ),
});
