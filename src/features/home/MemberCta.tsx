import { Link } from "@tanstack/react-router";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MemberCta() {
  return (
    <section className="container-page section-y">
      <div className="gradient-hero relative overflow-hidden rounded-3xl px-6 py-12 text-center sm:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-16 -top-16 size-64 rounded-full bg-accent/25 blur-3xl"
        />
        <LockKeyhole className="relative mx-auto size-8 text-primary-foreground" aria-hidden="true" />
        <h2 className="relative mt-4 text-2xl font-bold text-primary-foreground sm:text-3xl">
          Are you a Kakinada Union member?
        </h2>
        <p className="relative mx-auto mt-3 max-w-xl text-sm text-primary-foreground/80">
          Sign in to manage your firm profile, owners, pharmacists, licences and documents — all protected
          behind authentication.
        </p>
        <Button asChild size="lg" variant="secondary" className="relative mt-7">
          <Link to="/login">Secure Member Login</Link>
        </Button>
      </div>
    </section>
  );
}
