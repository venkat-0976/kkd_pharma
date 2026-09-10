import { useState, type ReactNode } from "react";
import { Link, useNavigate, useRouterState, Outlet } from "@tanstack/react-router";
import { LogOut, Menu, ShieldCheck, X } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { Logo } from "@/components/common/Logo";
import { Button } from "@/components/ui/button";
import { WhatsAppButton } from "@/components/common/WhatsAppButton";
import { adminNav } from "@/modules/admin/navigation/adminNav";
import { cn } from "@/lib/utils";
import { authService } from "@/services/auth/auth.service";

export function AdminLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  const signOut = async () => {
    await queryClient.cancelQueries();
    queryClient.clear();
    await authService.logout();
    await navigate({ to: "/login", replace: true });
  };

  const NavList = ({ onNavigate }: { onNavigate?: () => void }) => (
    <nav className="space-y-1">
      {adminNav.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border bg-surface/95 backdrop-blur">
        <div className="container-page flex h-16 items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Open admin menu"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu className="size-5" aria-hidden="true" />
            </Button>
            <Logo />
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden items-center gap-1.5 rounded-full border border-border px-3 py-1 text-xs font-semibold text-muted-foreground sm:inline-flex">
              <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
              Union admin
            </span>
            <Button variant="outline" size="sm" onClick={signOut}>
              <LogOut className="size-4" aria-hidden="true" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container-page grid gap-8 py-8 lg:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="hidden lg:block">
          <div className="sticky top-24 rounded-2xl border border-border bg-surface/70 p-3">
            <NavList />
          </div>
        </aside>
        <main className="min-w-0">
          <Outlet />
        </main>
      </div>

      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close menu"
            className="absolute inset-0 bg-foreground/40"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 w-72 max-w-[85%] overflow-y-auto border-r border-border bg-surface p-4">
            <div className="mb-4 flex items-center justify-between">
              <Logo />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Close menu"
                onClick={() => setDrawerOpen(false)}
              >
                <X className="size-5" aria-hidden="true" />
              </Button>
            </div>
            <NavList onNavigate={() => setDrawerOpen(false)} />
          </div>
        </div>
      ) : null}

      <WhatsAppButton message="Hello Kakinada Union admin desk," />
    </div>
  );
}

export function AdminPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>
        {description ? <p className="mt-1 text-sm text-muted-foreground">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}
