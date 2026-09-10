import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Logo } from "@/components/common/Logo";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  children: ReactNode;
  footer?: ReactNode;
}

/** Split-screen shell for login / forgot-password / join screens. */
export function AuthLayout({ title, subtitle, children, footer }: AuthLayoutProps) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      <aside className="gradient-hero relative hidden flex-col justify-between overflow-hidden p-10 lg:flex">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-24 -left-16 size-80 rounded-full bg-accent/25 blur-3xl"
        />
        <Logo tone="inverted" />
        <div className="relative max-w-md">
          <h2 className="text-3xl font-bold text-primary-foreground">
            One secure portal for every member firm.
          </h2>
          <p className="mt-4 text-sm text-primary-foreground/80">
            Licences, pharmacist records, documents and expiry reminders live behind authentication — never
            on the public website.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-primary-foreground/85">
            {[
              "Private document vault for every member",
              "Automatic licence expiry reminders",
              "Retailer and wholesaler member types",
            ].map((item) => (
              <li key={item} className="flex items-center gap-2.5">
                <ShieldCheck className="size-4 shrink-0" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <p className="relative text-xs text-primary-foreground/60">
          Kakinada Union · Pharmacy Healthcare Association
        </p>
      </aside>

      <div className="flex flex-col bg-background">
        <div className="flex items-center justify-between border-b border-border px-5 py-4 lg:hidden">
          <Logo />
        </div>
        <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-8">
          <div className="w-full max-w-md">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-4" aria-hidden="true" /> Back to website
            </Link>
            <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">{subtitle}</p>
            <div className="mt-8">{children}</div>
            {footer ? <div className="mt-8">{footer}</div> : null}
          </div>
        </div>
      </div>
    </div>
  );
}
