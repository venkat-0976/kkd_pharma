import { Link } from "react-router-dom";
import { brand } from "@/utils/navigation";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  name?: string;
  subtitle?: string;
  /** Use the light variant on dark backgrounds (footer, hero). */
  tone?: "default" | "inverted";
  onNavigate?: () => void;
}

export function Logo({
  className,
  name = brand.name,
  subtitle = brand.subtitle,
  tone = "default",
  onNavigate,
}: LogoProps) {
  return (
    <Link
      to="/"
      onClick={onNavigate}
      className={cn("flex items-center gap-3", className)}
      aria-label={`${name} home`}
    >
      <span className="gradient-accent flex size-10 shrink-0 items-center justify-center rounded-xl shadow-soft">
        <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true" fill="none">
          <path
            d="M12 4v16M4 12h16"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-primary-foreground"
          />
        </svg>
      </span>
      <span className="leading-tight">
        <span
          className={cn(
            "block font-display text-base font-bold tracking-tight",
            tone === "inverted" ? "text-primary-foreground" : "text-foreground",
          )}
        >
          {name}
        </span>
        <span
          className={cn(
            "block whitespace-nowrap text-[10px] font-medium uppercase tracking-[0.12em]",
            tone === "inverted" ? "text-primary-foreground/70" : "text-muted-foreground",
          )}
        >
          {subtitle}
        </span>
      </span>
    </Link>
  );
}
