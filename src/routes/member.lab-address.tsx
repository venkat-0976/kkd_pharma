import { createFileRoute } from "@tanstack/react-router";
import { RoleWorkspace } from "@/features/member/RoleWorkspace";
export const Route = createFileRoute("/member/lab-address")({
  component: () => <RoleWorkspace kind="lab-address" />,
});
