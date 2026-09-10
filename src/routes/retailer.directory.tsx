import { createFileRoute } from "@tanstack/react-router";
import { MemberDirectory } from "@/components/common/MemberDirectory";

export const Route = createFileRoute("/retailer/directory")({
  head: () => ({ meta: [{ title: "Directory — KKD Retailer Portal" }, { name: "robots", content: "noindex" }] }),
  component: () => <MemberDirectory initialTab="retailers" />,
});