import { Link } from "react-router-dom";
import { AuthLayout } from "@/features/auth/AuthLayout";
import { ForgotPasswordForm } from "@/features/auth/forms/ForgotPasswordForm";

export function ForgotPasswordPage() {
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

export default ForgotPasswordPage;
