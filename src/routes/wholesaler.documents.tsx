import { createFileRoute } from "@tanstack/react-router";
import { DocumentsPage } from "@/modules/wholesaler/pages/Documents/DocumentsPage";

export const Route = createFileRoute("/wholesaler/documents")({
  head: () => ({ meta: [{ title: "Documents — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: DocumentsPage,
});