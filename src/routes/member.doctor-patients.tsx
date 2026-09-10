import { createFileRoute } from "@tanstack/react-router";
import { RoleWorkspace } from "@/features/member/RoleWorkspace";
export const Route = createFileRoute("/member/doctor-patients")({
  component: () => <RoleWorkspace kind="doctor-patients" />,
});
