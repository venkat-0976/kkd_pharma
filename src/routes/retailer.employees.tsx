import { createFileRoute } from "@tanstack/react-router";
import { EmployeesPage } from "@/modules/retailer/pages/Employees/EmployeesPage";

export const Route = createFileRoute("/retailer/employees")({
  head: () => ({
    meta: [
      { title: "Employees — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: EmployeesPage,
});