import { createFileRoute } from "@tanstack/react-router";
import { ProfilePage } from "@/modules/retailer/pages/Profile/ProfilePage";

export const Route = createFileRoute("/retailer/profile")({
  head: () => ({
    meta: [
      { title: "Profile — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});
