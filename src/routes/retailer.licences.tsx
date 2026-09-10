import { createFileRoute } from "@tanstack/react-router";
import { LicencesPage } from "@/modules/retailer/pages/Licences/LicencesPage";

export const Route = createFileRoute("/retailer/licences")({
  head: () => ({
    meta: [
      { title: "Licences — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LicencesPage,
});