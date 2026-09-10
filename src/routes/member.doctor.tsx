import { createFileRoute } from "@tanstack/react-router";
import { RoleWorkspace } from "@/features/member/RoleWorkspace";
export const Route = createFileRoute("/member/doctor")({
  component: () => <RoleWorkspace kind="doctor" />,
});
