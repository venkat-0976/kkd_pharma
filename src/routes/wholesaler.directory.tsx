import { createFileRoute } from "@tanstack/react-router";
import { MemberDirectory } from "@/components/common/MemberDirectory";

export const Route = createFileRoute("/wholesaler/directory")({
  head: () => ({ meta: [{ title: "Directory — KKD Wholesaler Portal" }, { name: "robots", content: "noindex" }] }),
  component: () => <MemberDirectory initialTab="wholesalers" />,
});