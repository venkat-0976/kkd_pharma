import { createFileRoute } from "@tanstack/react-router";
import { RoleWorkspace } from "@/features/member/RoleWorkspace";
export const Route = createFileRoute("/member/lab-services")({
  component: () => <RoleWorkspace kind="lab-services" />,
});
