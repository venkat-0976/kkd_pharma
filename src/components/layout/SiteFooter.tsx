import { Link } from "react-router-dom";
import { Mail, MapPin, Phone } from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { brand, footerNav } from "@/config/navigation";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Kakinada Union represents registered retail and wholesale pharmacy members with
            regulatory support, professional development and a secure digital member portal.
          </p>
          <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />
              {brand.address}
            </li>
            <li className="flex items-center gap-2">
              <Phone className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <a className="hover:text-foreground" href={`tel:${brand.phone}`}>
                {brand.phone}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Mail className="size-4 shrink-0 text-primary" aria-hidden="true" />
              <a className="hover:text-foreground" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
            </li>
          </ul>
        </div>

        {footerNav.map((group) => (
          <nav key={group.title} aria-label={group.title}>
            <h3 className="text-sm font-semibold">{group.title}</h3>
            <ul className="mt-4 space-y-2.5">
              {group.items.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      <div className="border-t border-border">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Kakinada Union. All rights reserved.</p>
          <p>
            Member licences, documents and personal details are never published on this website.
          </p>
        </div>
      </div>
    </footer>
  );
}
