import { Link } from "react-router-dom";
import { ArrowRight, LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const heroImage = "/images/hero-pharmacy.jpg";

export function HeroSection() {
  return (
    <section className="gradient-hero relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-10 size-80 rounded-full bg-accent/20 blur-3xl"
      />
      <div className="container-page relative grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-1.5 text-xs font-medium text-primary-foreground">
            <ShieldCheck className="size-3.5" aria-hidden="true" />
            Kakinada Union · Pharmacy Healthcare Association
          </span>

          <h1 className="mt-6 text-3xl font-bold leading-tight text-primary-foreground sm:text-4xl lg:text-5xl">
            The united voice of Kakinada&apos;s pharmacy community
          </h1>

          <p className="mt-5 max-w-xl text-sm text-primary-foreground/80 sm:text-base">
            We represent over 500 registered retail and wholesale pharmacy members with regulatory
            guidance, professional development and a secure digital portal for every firm&apos;s
            licences and records.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button asChild size="lg" variant="secondary">
              <Link to="/login">
                <LogIn className="size-4" aria-hidden="true" />
                Member Login
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20"
            >
              <Link to="/join">Join Kakinada Union</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="ghost"
              className="text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
            >
              <Link to="/retailers">
                Explore Members
                <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl border border-primary-foreground/15 shadow-lift">
            <img
              src={heroImage}
              alt="Pharmacist inside a well-stocked Kakinada member pharmacy"
              width={1600}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="absolute -bottom-6 left-4 right-4 rounded-2xl border border-border bg-card p-4 shadow-lift sm:left-8 sm:right-auto sm:w-72">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Licence compliance
            </p>
            <p className="mt-1 text-sm">
              Members get automatic reminders before drug, food and pharmacist licences expire.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
