import { createFileRoute } from "@tanstack/react-router";
import { LicencesPage } from "@/modules/wholesaler/pages/Licences/LicencesPage";

export const Route = createFileRoute("/wholesaler/licences")({
  head: () => ({ meta: [{ title: "Licences — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: LicencesPage,
});