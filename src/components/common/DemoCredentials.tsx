import { KeyRound } from "lucide-react";
import { demoCredentials } from "@/services/auth/auth.service";

interface DemoCredentialsProps {
  onUse?: (identifier: string, password: string) => void;
}

/** Preview-only helper listing the demo logins until the secure backend lands. */
export function DemoCredentials({ onUse }: DemoCredentialsProps) {
  return (
    <div className="rounded-xl border border-dashed border-primary/40 bg-secondary/50 p-4">
      <div className="flex items-center gap-2">
        <KeyRound className="size-4 text-primary" aria-hidden="true" />
        <h2 className="text-sm font-semibold">Demo credentials</h2>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">
        Preview accounts only — they hold no real member data. Real logins activate with the secure
        backend.
      </p>
      <ul className="mt-3 space-y-2">
        {demoCredentials.map((account) => (
          <li
            key={account.identifier}
            className="flex items-center justify-between gap-3 rounded-lg border border-border bg-card px-3 py-2"
          >
            <div className="min-w-0">
              <p className="text-xs font-semibold">{account.label}</p>
              <p className="truncate text-xs text-muted-foreground">
                {account.identifier} · {account.password}
              </p>
            </div>
            {onUse ? (
              <button
                type="button"
                onClick={() => onUse(account.identifier, account.password)}
                className="shrink-0 rounded-md border border-primary/40 px-2.5 py-1 text-xs font-medium text-primary transition-colors hover:bg-primary/10"
              >
                Use
              </button>
            ) : null}
          </li>
        ))}
      </ul>
    </div>
  );
}
