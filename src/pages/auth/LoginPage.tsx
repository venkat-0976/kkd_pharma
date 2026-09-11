import { Link } from "react-router-dom";
import { AuthLayout } from "@/components/layout/AuthLayout";
import { LoginForm } from "@/components/common/LoginForm";

export function LoginPage() {
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

export default LoginPage;
