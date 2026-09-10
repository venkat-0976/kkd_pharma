import { createFileRoute } from "@tanstack/react-router";
import { RoleWorkspace } from "@/features/member/RoleWorkspace";
export const Route = createFileRoute("/member/blood-bank-address")({
  component: () => <RoleWorkspace kind="blood-bank-address" />,
});
