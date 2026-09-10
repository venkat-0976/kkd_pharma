import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/modules/wholesaler/pages/Profile/ProfilePage";

export const Route = createFileRoute("/wholesaler/profile")({
  head: () => ({ meta: [{ title: "Profile — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: ProfilePage,
});