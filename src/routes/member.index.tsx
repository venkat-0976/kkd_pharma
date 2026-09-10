import { createFileRoute, redirect } from "@tanstack/react-router";
import { authService } from "@/services/auth/auth.service";

/** The member portal always opens on the Profile workspace. */
export const Route = createFileRoute("/member/")({
  beforeLoad: () => {
    const loginType = authService.getSession()?.loginType;
    const firstRoute =
      loginType === "Hospital"
        ? "/member/hospital"
        : loginType === "Doctor"
          ? "/member/doctor"
          : loginType === "Lab"
            ? "/member/lab"
            : loginType === "Blood bank"
              ? "/member/blood-bank"
              : "/member/profile";
    throw redirect({ to: firstRoute });
  },
});
