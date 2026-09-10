import { createFileRoute } from "@tanstack/react-router";
import { RoleWorkspace } from "@/features/member/RoleWorkspace";
export const Route = createFileRoute("/member/role-documents")({
  component: () => <RoleWorkspace kind="role-documents" />,
});
