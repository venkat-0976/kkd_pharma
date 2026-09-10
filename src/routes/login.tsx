import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/features/auth/AuthLayout";
import { LoginForm } from "@/features/auth/forms/LoginForm";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Member Login — Kakinada Union" },
      {
        name: "description",
        content: "Secure sign-in for registered Kakinada Union retailer and wholesaler members.",
      },
      { property: "og:title", content: "Member Login — Kakinada Union" },
      {
        property: "og:description",
        content: "Secure access for registered retailers and wholesalers of Kakinada Union.",
      },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  return (
    <AuthLayout
      title="Kakinada Union Member Login"
      subtitle="Secure access for registered Retailers and Wholesalers."
      footer={
        <div className="rounded-xl border border-border bg-surface p-4 text-center text-sm">
          <p className="text-muted-foreground">Not a member?</p>
          <Link to="/join" className="mt-1 inline-block font-semibold text-primary hover:underline">
            Apply for Membership
          </Link>
        </div>
      }
    >
      <LoginForm />
    </AuthLayout>
  );
}
