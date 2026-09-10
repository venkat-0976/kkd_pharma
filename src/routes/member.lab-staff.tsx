import { createFileRoute } from "@tanstack/react-router";
import { RoleWorkspace } from "@/features/member/RoleWorkspace";
export const Route = createFileRoute("/member/lab-staff")({
  component: () => <RoleWorkspace kind="lab-staff" />,
});
