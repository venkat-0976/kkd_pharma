import React from "react";
import { type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface PharmacistOverviewCardProps {
  title: string;
  count: number | string;
  subtitle?: string;
  icon: LucideIcon;
  variant?: "default" | "warning" | "success";
  onClick?: () => void;
}

export function PharmacistOverviewCard({
  title,
  count,
  subtitle,
  icon: Icon,
  variant = "default",
  onClick,
}: PharmacistOverviewCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "rounded-2xl border border-border bg-card p-5 shadow-soft transition-all",
        onClick && "cursor-pointer hover:border-primary/50 hover:shadow-md",
      )}
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={cn(
            "grid size-11 place-items-center rounded-xl",
            variant === "warning" && "bg-warning/15 text-warning-foreground",
            variant === "success" && "bg-success/15 text-success",
            variant === "default" && "bg-primary/10 text-primary",
          )}
        >
          <Icon className="size-5" aria-hidden="true" />
        </span>
        <span className="font-display text-3xl font-bold tracking-tight text-foreground">
          {count}
        </span>
      </div>
      <div className="mt-4">
        <h3 className="text-sm font-semibold text-foreground">{title}</h3>
        {subtitle ? <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p> : null}
      </div>
    </div>
  );
}
