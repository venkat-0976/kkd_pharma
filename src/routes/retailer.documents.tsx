import { createFileRoute } from "@tanstack/react-router";
import { DocumentsPage } from "@/modules/retailer/pages/Documents/DocumentsPage";

export const Route = createFileRoute("/retailer/documents")({
  head: () => ({
    meta: [
      { title: "Documents — KKD Retailer Portal" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: DocumentsPage,
});