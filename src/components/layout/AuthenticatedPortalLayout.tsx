import { useState, type ReactNode } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  MapPin,
  MessageCircle,
  LogOut,
  Menu,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { Logo } from "@/components/common/Logo";
import { UnionShopIdentity } from "@/components/common/UnionShopIdentity";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { getUnionByMemberId, type UnionBrand } from "@/utils/unions";
import { authService } from "@/services/auth/auth.service";
import { useMemberRecord } from "@/hooks/useMemberRecord";
import { buildAlerts } from "@/services/member/member.service";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

export interface NavItem {
  label: string;
  short: string;
  to: string;
  icon: typeof UserRound;
}

interface AuthenticatedPortalLayoutProps {
  navItems: NavItem[];
  mobileNavItems?: NavItem[];
  roleName: string;
  profileRoute: string;
  settingsRoute?: string;
  alertsRoute?: string;
  children: ReactNode;
}

function getWhatsAppUrl(union: UnionBrand) {
  return `https://wa.me/918842001180?text=${encodeURIComponent(`Hello ${union.name}, I need assistance.`)}`;
}

export function UnionDetailsPopover({
  union,
  compact = false,
}: {
  union: UnionBrand;
  compact?: boolean;
}) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-label={`Open ${union.name} details`}
          className={cn(
            "flex items-center gap-2 rounded-lg border border-border bg-card px-2.5 py-1.5 text-left transition-colors hover:border-primary/40 hover:bg-secondary",
            compact ? "max-w-40" : "max-w-56",
          )}
        >
          <span className="grid size-7 shrink-0 place-items-center rounded-md bg-primary text-primary-foreground">
            <MapPin className="size-3.5" aria-hidden="true" />
          </span>
          <span className="min-w-0 leading-tight">
            <span className="block truncate text-xs font-semibold">{union.name}</span>
            <span className="block truncate text-[10px] text-muted-foreground">Active union</span>
          </span>
          <ChevronDown className="size-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
        </button>
      </PopoverTrigger>
      <PopoverContent align="end" className="w-[min(20rem,calc(100vw-2rem))] p-0">
        <div className="border-b border-border bg-secondary/60 p-4">
          <div className="flex items-start gap-3">
            <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
              <MapPin className="size-5" aria-hidden="true" />
            </span>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-sm font-semibold">{union.name}</h2>
                <span className="rounded-full bg-success/10 px-2 py-0.5 text-[10px] font-semibold text-success">
                  Active
                </span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">Registered Pharmacy Union</p>
              <p className="mt-2 font-mono text-[11px] text-muted-foreground">Union ID: KU-00123</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-3 p-4 text-xs">
          <div>
            <p className="text-muted-foreground">District</p>
            <p className="mt-0.5 font-medium">Kakinada</p>
          </div>
          <div>
            <p className="text-muted-foreground">Established</p>
            <p className="mt-0.5 font-medium">2012</p>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Office address</p>
            <p className="mt-0.5 font-medium">Kakinada, Andhra Pradesh</p>
          </div>
          <div>
            <p className="text-muted-foreground">Total members</p>
            <p className="mt-0.5 font-semibold">1,248</p>
          </div>
          <div>
            <p className="text-muted-foreground">Retailers</p>
            <p className="mt-0.5 font-semibold">862</p>
          </div>
          <div>
            <p className="text-muted-foreground">Wholesalers</p>
            <p className="mt-0.5 font-semibold">214</p>
          </div>
          <div>
            <p className="text-muted-foreground">Pharmacists</p>
            <p className="mt-0.5 font-semibold">172</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-2 border-t border-border p-3">
          <Button asChild size="sm" className="text-xs">
            <Link to="/member/directory">View Union</Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="text-xs">
            <Link to="/member/directory">Union Directory</Link>
          </Button>
          <Button asChild size="sm" variant="outline" className="text-xs">
            <Link to="/contact">Contact Union</Link>
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}

export function AuthenticatedPortalLayout({
  navItems,
  mobileNavItems,
  roleName,
  profileRoute,
  settingsRoute,
  alertsRoute,
  children,
}: AuthenticatedPortalLayoutProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();
  const { data: record } = useMemberRecord();
  const location = useLocation();
  const pathname = location.pathname;
  const session = authService.getSession();

  const actualMobileNav = mobileNavItems || navItems.slice(0, 4);

  const alerts = record ? buildAlerts(record).filter((a) => a.status !== "valid") : [];
  const shopId = record?.profile.memberId ?? session?.memberId ?? "";
  const shopName = record?.profile.shopName ?? session?.shopName ?? "Member workspace";
  const shopInitials = shopName
    .split(/\s+/u)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0] ?? "")
    .join("")
    .toUpperCase();
  const union = getUnionByMemberId(shopId);

  const signOut = async () => {
    await authService.logout();
    navigate("/login", { replace: true });
  };

  const NavList = ({
    onNavigate,
    collapsed = false,
  }: {
    onNavigate?: () => void;
    collapsed?: boolean;
  }) => (
    <nav className="space-y-1">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.to;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            title={collapsed ? item.label : undefined}
            className={cn(
              "flex items-center rounded-xl text-sm font-medium transition-colors",
              collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5",
              active
                ? "bg-primary text-primary-foreground shadow-soft"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground",
            )}
          >
            <Icon className="size-4 shrink-0" aria-hidden="true" />
            {collapsed ? (
              <span className="sr-only">{item.label}</span>
            ) : (
              <span className="truncate">{item.label}</span>
            )}
          </Link>
        );
      })}
      <button
        type="button"
        onClick={signOut}
        title={collapsed ? "Logout" : undefined}
        className={cn(
          "flex w-full items-center rounded-xl text-sm font-medium text-destructive transition-colors hover:bg-destructive/10",
          collapsed ? "justify-center px-2 py-2.5" : "gap-3 px-3 py-2.5",
        )}
      >
        <LogOut className="size-4 shrink-0" aria-hidden="true" />
        {collapsed ? <span className="sr-only">Logout</span> : "Logout"}
      </button>
    </nav>
  );

  return (
    <div className="min-h-screen bg-surface/40">
      <header className="sticky top-0 z-40 border-b border-border bg-secondary">
        <div className="mx-auto flex h-16 w-full max-w-[110rem]">
          <div className="flex min-w-0 flex-1 items-center gap-2 px-4 lg:hidden">
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              aria-label="Open member menu"
              className="rounded-md p-2 text-muted-foreground hover:bg-card hover:text-foreground"
            >
              <Menu className="size-4" aria-hidden="true" />
            </button>
            {union ? <UnionDetailsPopover union={union} compact /> : <Logo />}
            <div className="ml-auto flex items-center">
              <a
                href={getWhatsAppUrl(union)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Kakinada Union on WhatsApp"
                title="WhatsApp union office"
                className="grid size-9 place-items-center rounded-md text-success hover:bg-card"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
              </a>
              {alertsRoute ? (
                <Link
                  to={alertsRoute}
                  aria-label={`Expiry alerts (${alerts.length})`}
                  className="relative grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground"
                >
                  <Bell className="size-4" aria-hidden="true" />
                  {alerts.length ? (
                    <span className="absolute right-1 top-1 size-1.5 rounded-full bg-destructive" />
                  ) : null}
                </Link>
              ) : null}
            </div>
          </div>

          <div
            className={cn(
              "relative hidden shrink-0 items-center border-r border-border px-3 lg:flex",
              sidebarCollapsed ? "w-16 justify-center" : "w-64 justify-between gap-2",
            )}
          >
            {shopId ? (
              <UnionShopIdentity shopId={shopId} compact markOnly={sidebarCollapsed} />
            ) : (
              <Logo />
            )}
            <button
              type="button"
              onClick={() => setSidebarCollapsed((open) => !open)}
              aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="absolute -right-3 top-1/2 z-10 grid size-6 -translate-y-1/2 place-items-center rounded-full border border-border bg-card text-muted-foreground hover:text-foreground"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="size-3.5" aria-hidden="true" />
              ) : (
                <ChevronLeft className="size-3.5" aria-hidden="true" />
              )}
            </button>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-between gap-4 px-6 lg:flex">
            <div className="flex min-w-0 items-center gap-3">
              {union ? <UnionDetailsPopover union={union} /> : <Logo />}
            </div>

            <div className="flex shrink-0 items-center gap-1">
              {union ? (
                <a
                  href={getWhatsAppUrl(union)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Chat with Kakinada Union on WhatsApp"
                  title="WhatsApp union office"
                  className="grid size-9 place-items-center rounded-md text-success hover:bg-secondary"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                </a>
              ) : null}
              {alertsRoute ? (
                <Link
                  to={alertsRoute}
                  aria-label={`Expiry alerts (${alerts.length})`}
                  className="relative grid size-9 place-items-center rounded-md text-muted-foreground hover:bg-card hover:text-foreground"
                >
                  <Bell className="size-4" aria-hidden="true" />
                  {alerts.length ? (
                    <span className="absolute right-1 top-1 size-1.5 rounded-full bg-destructive" />
                  ) : null}
                </Link>
              ) : null}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    type="button"
                    aria-label="Profile menu"
                    className="grid size-8 place-items-center rounded-md bg-primary text-[11px] font-semibold text-primary-foreground"
                  >
                    {shopInitials || <UserRound className="size-4" />}
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel className="space-y-0.5">
                    <p className="truncate">{shopName}</p>
                    {shopId ? (
                      <p className="font-mono text-[11px] font-normal text-muted-foreground">
                        {shopId}
                      </p>
                    ) : null}
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={profileRoute}>My profile</Link>
                  </DropdownMenuItem>
                  {settingsRoute ? (
                    <DropdownMenuItem asChild>
                      <Link to={settingsRoute}>Settings</Link>
                    </DropdownMenuItem>
                  ) : null}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => void signOut()} className="text-destructive">
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-[110rem]">
        <aside
          className={cn(
            "sticky top-16 hidden h-[calc(100vh-4rem)] shrink-0 flex-col border-r border-border bg-card py-5 lg:flex",
            sidebarCollapsed ? "w-16 px-2" : "w-64 px-4",
          )}
        >
          <div className="flex-1 overflow-y-auto">
            {sidebarCollapsed ? null : (
              <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
                {roleName}
              </p>
            )}
            <NavList collapsed={sidebarCollapsed} />
          </div>
          {sidebarCollapsed ? (
            <p
              className="grid place-items-center text-muted-foreground"
              title="Private member area"
            >
              <ShieldCheck className="size-4 text-primary" aria-hidden="true" />
            </p>
          ) : (
            <p className="flex items-center gap-2 rounded-xl bg-secondary/70 p-3 text-[11px] text-muted-foreground">
              <ShieldCheck className="size-4 shrink-0 text-primary" aria-hidden="true" />
              Private area — visible only to you and authorised union administrators.
            </p>
          )}
        </aside>

        <div className="min-w-0 flex-1">
          <main className="px-4 pb-28 pt-6 sm:px-6 lg:pb-12">{children}</main>
        </div>
      </div>

      {/* Mobile drawer */}
      {drawerOpen ? (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setDrawerOpen(false)}
            className="absolute inset-0 bg-foreground/40"
          />
          <div className="absolute inset-y-0 left-0 flex w-72 max-w-[85%] flex-col bg-card p-4 shadow-lift">
            <div className="flex items-start justify-between gap-3">
              {shopId ? (
                <div className="min-w-0 flex-1 rounded-2xl border border-border bg-surface/80 p-3">
                  <UnionShopIdentity shopId={shopId} compact />
                </div>
              ) : (
                <Logo />
              )}
              <button
                type="button"
                onClick={() => setDrawerOpen(false)}
                aria-label="Close menu"
                className="mt-1"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flex-1 overflow-y-auto">
              <NavList onNavigate={() => setDrawerOpen(false)} />
            </div>
          </div>
        </div>
      ) : null}

      {/* Mobile bottom navigation */}
      <nav className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-5 border-t border-border bg-card/95 backdrop-blur lg:hidden">
        {actualMobileNav.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium",
                active ? "text-primary" : "text-muted-foreground",
              )}
            >
              <Icon className="size-5" aria-hidden="true" />
              {item.short}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setDrawerOpen(true)}
          className="flex flex-col items-center gap-1 py-2.5 text-[11px] font-medium text-muted-foreground"
        >
          <Menu className="size-5" aria-hidden="true" />
          More
        </button>
      </nav>
    </div>
  );
}

export function MemberPageHeader({
  title,
  description,
  action,
}: {
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-primary/15 bg-card bg-linear-to-r from-primary/7 to-accent/10 px-5 py-5 shadow-sm sm:px-6 sm:py-6">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-display text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {title}
          </h1>
          <p className="mt-1.5 max-w-2xl text-sm font-medium text-secondary-foreground">
            {description}
          </p>
        </div>
        {action}
      </header>
    </section>
  );
}
