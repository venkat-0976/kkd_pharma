import { createFileRoute, redirect } from "@tanstack/react-router";

/** Redirect /retailer → /retailer/profile */
export const Route = createFileRoute("/retailer/")({
  beforeLoad: () => {
    throw redirect({ to: "/retailer/profile" });
  },
});
