import { createFileRoute } from "@tanstack/react-router";
import { AlertsPage } from "@/modules/wholesaler/pages/Alerts/AlertsPage";

export const Route = createFileRoute("/wholesaler/alerts")({
  head: () => ({ meta: [{ title: "Alerts — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: AlertsPage,
});