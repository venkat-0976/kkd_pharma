import { createFileRoute, Link } from "@tanstack/react-router";
import { AuthLayout } from "@/features/auth/AuthLayout";
import { ForgotPasswordForm } from "@/features/auth/forms/ForgotPasswordForm";

export const Route = createFileRoute("/forgot-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Kakinada Union" },
      {
        name: "description",
        content: "Request password reset instructions for your Kakinada Union member account.",
      },
      { property: "og:title", content: "Reset Password — Kakinada Union" },
      { property: "og:description", content: "Recover access to your Kakinada Union member account." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ForgotPasswordPage,
});

function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot your password?"
      subtitle="Enter your registered mobile number or Member ID and we will send reset instructions."
      footer={
        <p className="text-center text-sm text-muted-foreground">
          Remembered it?{" "}
          <Link to="/login" className="font-semibold text-primary hover:underline">
            Back to login
          </Link>
        </p>
      }
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
}
