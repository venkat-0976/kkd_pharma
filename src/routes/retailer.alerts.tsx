import { createFileRoute } from "@tanstack/react-router";
import { AlertsPage } from "@/modules/retailer/pages/Alerts/AlertsPage";

export const Route = createFileRoute("/retailer/alerts")({
  head: () => ({
    meta: [
      { title: "Alerts — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AlertsPage,
});