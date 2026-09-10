import { getUnionByMemberId, type UnionBrand, type UnionSymbol } from "@/config/unions";
import { cn } from "@/lib/utils";

function UnionSymbolMark({ symbol, className }: { symbol: UnionSymbol; className?: string }) {
  return (
    <span
      className={cn(
        "gradient-accent grid size-10 shrink-0 place-items-center rounded-xl text-primary-foreground shadow-soft",
        className,
      )}
      aria-hidden="true"
    >
      {symbol === "plus-circle" ? (
        <svg viewBox="0 0 24 24" className="size-5" fill="none">
          <path
            d="M12 4v16M4 12h16"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            className="text-primary-foreground"
          />
        </svg>
      ) : null}
    </span>
  );
}

interface UnionShopIdentityProps {
  shopId: string;
  compact?: boolean;
  tone?: "default" | "inverse";
  markOnly?: boolean;
  className?: string;
}

export function UnionShopIdentity({
  shopId,
  compact = false,
  tone = "default",
  markOnly = false,
  className,
}: UnionShopIdentityProps) {
  const union: UnionBrand | null = getUnionByMemberId(shopId);
  if (!union || !shopId) return null;

  if (markOnly) {
    return (
      <UnionSymbolMark
        symbol={union.symbol}
        className={cn(compact ? "size-9" : "size-10", className)}
      />
    );
  }

  return (
    <div className={cn("flex min-w-0 items-center gap-2.5", className)}>
      <UnionSymbolMark symbol={union.symbol} className={compact ? "size-9" : "size-10"} />
      <div className="min-w-0 leading-tight">
        <p
          className={cn(
            "truncate font-semibold tracking-tight",
            compact ? "text-sm" : "text-[15px]",
            tone === "inverse" ? "text-white" : "text-foreground",
          )}
        >
          {union.name}
        </p>
        <p
          className={cn(
            "mt-0.5 truncate font-mono text-[11px]",
            tone === "inverse" ? "text-white/55" : "text-muted-foreground",
          )}
        >
          {shopId}
        </p>
      </div>
    </div>
  );
}
