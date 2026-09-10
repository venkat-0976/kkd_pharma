import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Logo } from "@/components/common/Logo";
import { primaryNav } from "@/config/navigation";

export function MobileNavDrawer() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
          <Menu className="size-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[86vw] max-w-sm p-0">
        <SheetTitle className="sr-only">Main navigation</SheetTitle>
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <Logo onNavigate={close} />
          <Button variant="ghost" size="icon" onClick={close} aria-label="Close menu">
            <X className="size-5" />
          </Button>
        </div>
        <nav className="flex flex-col gap-1 overflow-y-auto px-3 py-4">
          {primaryNav.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={close}
              className="rounded-lg px-3 py-3 text-sm font-medium transition-colors hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto grid gap-2 border-t border-border px-5 py-4">
          <Button asChild>
            <Link to="/login" onClick={close}>
              Member Login
            </Link>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
