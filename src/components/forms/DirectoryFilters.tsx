import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export interface DirectoryFilterState {
  query: string;
  area: string;
  category: string;
  sort: "az" | "za";
}

interface DirectoryFiltersProps {
  value: DirectoryFilterState;
  onChange: (next: DirectoryFilterState) => void;
  areas: string[];
  categories: string[];
  categoryLabel?: string;
}

export function DirectoryFilters({
  value,
  onChange,
  areas,
  categories,
  categoryLabel = "Business type",
}: DirectoryFiltersProps) {
  const set = <K extends keyof DirectoryFilterState>(key: K, v: DirectoryFilterState[K]) =>
    onChange({ ...value, [key]: v });

  return (
    <div className="grid gap-4 rounded-xl border border-border bg-card p-4 shadow-soft sm:grid-cols-2 lg:grid-cols-4">
      <div className="sm:col-span-2 lg:col-span-1">
        <Label htmlFor="directory-search">Search</Label>
        <div className="relative mt-1.5">
          <Search
            className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="directory-search"
            placeholder="Shop name or area"
            className="pl-9"
            value={value.query}
            onChange={(e) => set("query", e.target.value)}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="directory-area">Area</Label>
        <Select value={value.area} onValueChange={(v) => set("area", v)}>
          <SelectTrigger id="directory-area" className="mt-1.5 w-full">
            <SelectValue placeholder="All areas" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All areas</SelectItem>
            {areas.map((a) => (
              <SelectItem key={a} value={a}>
                {a}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="directory-category">{categoryLabel}</Label>
        <Select value={value.category} onValueChange={(v) => set("category", v)}>
          <SelectTrigger id="directory-category" className="mt-1.5 w-full">
            <SelectValue placeholder="All" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c} value={c}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div>
        <Label htmlFor="directory-sort">Sort</Label>
        <Select value={value.sort} onValueChange={(v) => set("sort", v as DirectoryFilterState["sort"])}>
          <SelectTrigger id="directory-sort" className="mt-1.5 w-full">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="az">Name A – Z</SelectItem>
            <SelectItem value="za">Name Z – A</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

export const defaultDirectoryFilters: DirectoryFilterState = {
  query: "",
  area: "all",
  category: "all",
  sort: "az",
};
