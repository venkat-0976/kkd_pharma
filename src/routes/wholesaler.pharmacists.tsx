import { createFileRoute } from "@tanstack/react-router";
import { PharmacistsPage } from "@/modules/wholesaler/pages/Pharmacists/PharmacistsPage";

export const Route = createFileRoute("/wholesaler/pharmacists")({
  head: () => ({ meta: [{ title: "Pharmacists — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: PharmacistsPage,
});