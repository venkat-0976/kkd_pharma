import { createFileRoute } from "@tanstack/react-router";
import { RoleWorkspace } from "@/features/member/RoleWorkspace";
export const Route = createFileRoute("/member/blood-donors")({
  component: () => <RoleWorkspace kind="blood-donors" />,
});
