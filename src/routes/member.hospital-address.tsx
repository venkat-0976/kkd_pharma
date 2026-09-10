import { createFileRoute } from "@tanstack/react-router";
import { RoleWorkspace } from "@/features/member/RoleWorkspace";
export const Route = createFileRoute("/member/hospital-address")({
  component: () => <RoleWorkspace kind="hospital-address" />,
});
