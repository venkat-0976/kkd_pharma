import { createFileRoute } from "@tanstack/react-router";
import { EmployeesPage } from "@/modules/wholesaler/pages/Employees/EmployeesPage";

export const Route = createFileRoute("/wholesaler/employees")({
  head: () => ({ meta: [{ title: "Employees — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: EmployeesPage,
});