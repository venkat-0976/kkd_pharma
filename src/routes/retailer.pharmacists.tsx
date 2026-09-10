import { createFileRoute } from "@tanstack/react-router";
import { PharmacistsPage } from "@/modules/retailer/pages/Pharmacists/PharmacistsPage";

export const Route = createFileRoute("/retailer/pharmacists")({
  head: () => ({
    meta: [
      { title: "Pharmacists — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PharmacistsPage,
});