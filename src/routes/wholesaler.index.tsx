import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/wholesaler/")({
  beforeLoad: () => { throw redirect({ to: "/wholesaler/profile" }); },
});