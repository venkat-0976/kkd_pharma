import { createFileRoute } from "@tanstack/react-router";
import { RoleWorkspace } from "@/features/member/RoleWorkspace";
export const Route = createFileRoute("/member/hospital-doctors")({
  component: () => <RoleWorkspace kind="hospital-doctors" />,
});
