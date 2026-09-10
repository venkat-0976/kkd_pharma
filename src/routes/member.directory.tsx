import { createFileRoute } from "@tanstack/react-router";
import { MemberDirectory } from "@/components/common/MemberDirectory";

export const Route = createFileRoute("/member/directory")({
  head: () => ({
    meta: [{ title: "Directory — Kakinada Union Member Portal" }, { name: "robots", content: "noindex" }],
  }),
  component: () => <MemberDirectory initialTab="retailers" />,
});