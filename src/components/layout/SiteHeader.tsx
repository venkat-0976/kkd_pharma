import { Link } from "@tanstack/react-router";
import { Mail, Phone, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
import { MobileNavDrawer } from "@/components/navigation/MobileNavDrawer";
import { brand, primaryNav } from "@/config/navigation";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="hidden bg-surface-strong/70 lg:block">
        <div className="container-page flex h-9 items-center justify-between text-xs text-muted-foreground">
          <p>Serving retail and wholesale pharmacies across Kakinada since 1991</p>
          <div className="flex items-center gap-5">
            <a className="flex items-center gap-1.5 hover:text-foreground" href={`tel:${brand.phone}`}>
              <Phone className="size-3.5" aria-hidden="true" /> {brand.phone}
            </a>
            <a className="flex items-center gap-1.5 hover:text-foreground" href={`mailto:${brand.email}`}>
              <Mail className="size-3.5" aria-hidden="true" /> {brand.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-page flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-primary bg-secondary" }}
              className="rounded-lg px-2.5 py-2 text-[13px] font-medium text-foreground/80 transition-colors hover:bg-secondary hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/login">
              <LogIn className="size-4" aria-hidden="true" />
              Member Login
            </Link>
          </Button>
          <MobileNavDrawer />
        </div>
      </div>
    </header>
  );
}
