import { createFileRoute } from "@tanstack/react-router";
import { OwnersPage } from "@/modules/retailer/pages/Owners/OwnersPage";

export const Route = createFileRoute("/retailer/owners")({
  head: () => ({
    meta: [
      { title: "Owners & Partners — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: OwnersPage,
});