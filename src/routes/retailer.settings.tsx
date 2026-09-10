import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/modules/retailer/pages/Settings/SettingsPage";

export const Route = createFileRoute("/retailer/settings")({
  head: () => ({
    meta: [
      { title: "Settings — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: SettingsPage,
});