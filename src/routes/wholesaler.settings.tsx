import { createFileRoute } from "@tanstack/react-router";
import { SettingsPage } from "@/modules/wholesaler/pages/Settings/SettingsPage";

export const Route = createFileRoute("/wholesaler/settings")({
  head: () => ({ meta: [{ title: "Settings — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: SettingsPage,
});