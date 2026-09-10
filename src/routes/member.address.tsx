import { createFileRoute, redirect } from "@tanstack/react-router";

/** Shop address is edited on the Profile tab. */
export const Route = createFileRoute("/member/address")({
  beforeLoad: () => {
    throw redirect({ to: "/member/profile" });
  },
});
