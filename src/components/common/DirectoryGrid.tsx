import { useMemo, useState } from "react";
import { BusinessCard } from "@/components/common/BusinessCard";
import { EmptyState } from "@/components/common/EmptyState";
import {
  DirectoryFilters,
  defaultDirectoryFilters,
  type DirectoryFilterState,
} from "@/components/common/DirectoryFilters";
import type { PublicBusiness } from "@/types/directory";

/** Search / filter / sort shell shared by the retailer and wholesaler directories. */
export function DirectoryGrid({
  businesses,
  areas,
}: {
  businesses: PublicBusiness[];
  areas: string[];
}) {
  const [filters, setFilters] = useState<DirectoryFilterState>(defaultDirectoryFilters);

  const categories = useMemo(
    () => Array.from(new Set(businesses.flatMap((b) => b.categories))).sort(),
    [businesses],
  );

  const results = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return businesses
      .filter((b) => {
        const matchesQuery =
          !q ||
          b.shopName.toLowerCase().includes(q) ||
          b.area.toLowerCase().includes(q) ||
          b.generalAddress.toLowerCase().includes(q);
        const matchesArea = filters.area === "all" || b.area === filters.area;
        const matchesCategory =
          filters.category === "all" || b.categories.includes(filters.category);
        return matchesQuery && matchesArea && matchesCategory;
      })
      .sort((a, b) =>
        filters.sort === "az"
          ? a.shopName.localeCompare(b.shopName)
          : b.shopName.localeCompare(a.shopName),
      );
  }, [businesses, filters]);

  return (
    <div className="space-y-6">
      <DirectoryFilters
        value={filters}
        onChange={setFilters}
        areas={areas}
        categories={categories}
        categoryLabel="Category"
      />
      <p className="text-sm text-muted-foreground">
        Showing {results.length} of {businesses.length} listings
      </p>
      {results.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((business) => (
            <BusinessCard key={business.slug} business={business} />
          ))}
        </div>
      )}
    </div>
  );
}
