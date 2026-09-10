import { createFileRoute } from "@tanstack/react-router";
import { OwnersPage } from "@/modules/wholesaler/pages/Owners/OwnersPage";

export const Route = createFileRoute("/wholesaler/owners")({
  head: () => ({ meta: [{ title: "Owners — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: OwnersPage,
});