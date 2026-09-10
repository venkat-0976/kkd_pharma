import { useMemo, useState } from "react";
import {
  Building2,
  Filter,
  FlaskConical,
  HeartPulse,
  Search,
  ShieldPlus,
  Store,
  Users,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { listDoctors, listHospitals, listLabs } from "@/services/directory/partners.service";
import { listRetailers } from "@/services/directory/retailers.service";
import { listWholesalers } from "@/services/directory/wholesalers.service";
import type { PublicBusiness, PublicOrganisation } from "@/types/directory";

type DirectoryTab = "retailers" | "wholesalers" | "hospitals" | "labs" | "doctors" | "blood-banks";
type DirectoryRow = { name: string; phone: string; area: string; city: string };

const tabs: { id: DirectoryTab; label: string; icon: typeof Store }[] = [
  { id: "retailers", label: "Retailers", icon: Store },
  { id: "wholesalers", label: "Wholesalers", icon: Building2 },
  { id: "hospitals", label: "Hospitals", icon: HeartPulse },
  { id: "labs", label: "Labs", icon: FlaskConical },
  { id: "doctors", label: "Doctors", icon: Users },
  { id: "blood-banks", label: "Blood Banks", icon: ShieldPlus },
];

function businessRows(records: PublicBusiness[]): DirectoryRow[] {
  return records.map((record) => ({
    name: record.shopName,
    phone: record.publicPhone ?? "Not published",
    area: record.area,
    city: record.city,
  }));
}

function organisationRows(records: PublicOrganisation[]): DirectoryRow[] {
  return records.map((record) => ({
    name: record.name,
    phone: record.publicPhone ?? "Not published",
    area: record.area,
    city: record.city,
  }));
}

function rowsForTab(tab: DirectoryTab): DirectoryRow[] {
  switch (tab) {
    case "retailers":
      return businessRows(listRetailers());
    case "wholesalers":
      return businessRows(listWholesalers());
    case "hospitals":
      return organisationRows(listHospitals());
    case "labs":
      return organisationRows(listLabs());
    case "doctors":
      return organisationRows(listDoctors());
    case "blood-banks":
      return [];
  }
}

export function MemberDirectory({ initialTab }: { initialTab: DirectoryTab }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [city, setCity] = useState("all");
  const [area, setArea] = useState("all");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const rows = rowsForTab(activeTab);
  const activeLabel = tabs.find((tab) => tab.id === activeTab)?.label ?? "Directory";
  const cities = useMemo(
    () => Array.from(new Set(rows.map((row) => row.city).filter(Boolean))).sort(),
    [rows],
  );
  const areas = useMemo(
    () => Array.from(new Set(rows.map((row) => row.area).filter(Boolean))).sort(),
    [rows],
  );
  const filteredRows = useMemo(() => {
    const query = search.trim().toLowerCase();
    const nameQuery = name.trim().toLowerCase();
    return rows.filter((row) => {
      const searchable = `${row.name} ${row.phone} ${row.area} ${row.city}`.toLowerCase();
      return (
        (!query || searchable.includes(query)) &&
        (!nameQuery || row.name.toLowerCase().includes(nameQuery)) &&
        (city === "all" || row.city === city) &&
        (area === "all" || row.area === area)
      );
    });
  }, [area, city, name, rows, search]);

  const activeFilterCount = [name, city !== "all" ? city : "", area !== "all" ? area : ""].filter(
    Boolean,
  ).length;
  const clearFilters = () => {
    setSearch("");
    setName("");
    setCity("all");
    setArea("all");
  };

  return (
    <div className="space-y-5">
      <div className="overflow-x-auto rounded-xl border border-border bg-card p-1 shadow-soft">
        <div
          className="grid min-w-[700px] grid-cols-6 gap-1"
          role="tablist"
          aria-label="Directory categories"
        >
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center justify-center gap-2 rounded-lg border-b-2 px-2 py-3 text-sm font-semibold transition-colors ${active ? "border-primary bg-primary/10 text-primary" : "border-transparent text-muted-foreground hover:bg-surface/70 hover:text-foreground"}`}
              >
                <Icon className="size-4" aria-hidden="true" />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      <section className="rounded-xl border border-border bg-card p-3 shadow-soft sm:p-4">
        <div className="flex items-center gap-2">
          <div className="relative min-w-0 flex-1">
            <Label htmlFor="member-directory-search" className="sr-only">
              Search directory
            </Label>
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary"
              aria-hidden="true"
            />
            <Input
              id="member-directory-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, phone number, area or city"
              className="h-11 border-primary/30 bg-surface/30 pl-10"
            />
          </div>
          <Button
            type="button"
            variant={filtersOpen || activeFilterCount ? "default" : "outline"}
            onClick={() => setFiltersOpen((open) => !open)}
            className="h-11 shrink-0"
            aria-expanded={filtersOpen}
          >
            {filtersOpen ? (
              <X className="size-4" aria-hidden="true" />
            ) : (
              <Filter className="size-4" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">Filters</span>
            {activeFilterCount ? (
              <span className="grid size-5 place-items-center rounded-full bg-background/20 text-xs">
                {activeFilterCount}
              </span>
            ) : null}
          </Button>
        </div>
        {filtersOpen ? (
          <div className="mt-3 grid gap-3 border-t border-border/70 pt-3 sm:grid-cols-2 lg:grid-cols-[1.2fr_1fr_1fr_auto] lg:items-end">
            <div>
              <Label htmlFor="directory-name">Name</Label>
              <Input
                id="directory-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                placeholder="Filter by name"
                className="mt-1.5 h-10"
              />
            </div>
            <div>
              <Label htmlFor="directory-city">City</Label>
              <Select value={city} onValueChange={setCity}>
                <SelectTrigger id="directory-city" className="mt-1.5 h-10">
                  <SelectValue placeholder="All cities" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All cities</SelectItem>
                  {cities.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="directory-area">Area / locality</Label>
              <Select value={area} onValueChange={setArea}>
                <SelectTrigger id="directory-area" className="mt-1.5 h-10">
                  <SelectValue placeholder="All areas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All areas</SelectItem>
                  {areas.map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button type="button" variant="outline" onClick={clearFilters} className="h-10">
              <X className="size-4" aria-hidden="true" />
              Clear Filters
            </Button>
          </div>
        ) : null}
      </section>

      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-lg font-bold">{activeLabel}</h1>
          <p className="text-xs text-muted-foreground">
            Showing {filteredRows.length} of {rows.length} public records
          </p>
        </div>
      </div>
      {filteredRows.length === 0 ? (
        <div className="rounded-xl border border-dashed border-border bg-card px-5 py-12 text-center">
          <p className="font-semibold">No {activeLabel.toLowerCase()} found</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Try another search or clear the filters.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-soft">
          <table className="w-full min-w-[680px] border-collapse text-left text-sm">
            <thead className="bg-surface/70">
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Phone Number</th>
                <th className="px-4 py-3 font-semibold">Area / Locality</th>
                <th className="px-4 py-3 font-semibold">City</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr
                  key={`${row.name}-${row.area}`}
                  className="border-b border-border/70 last:border-0 hover:bg-surface/40"
                >
                  <td className="px-4 py-3 font-semibold">{row.name}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.phone}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.area || "Not provided"}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.city || "Not provided"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
