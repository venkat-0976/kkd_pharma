import { createFileRoute } from "@tanstack/react-router";
import { RoleWorkspace } from "@/features/member/RoleWorkspace";
export const Route = createFileRoute("/member/blood-bank")({
  component: () => <RoleWorkspace kind="blood-bank" />,
});
