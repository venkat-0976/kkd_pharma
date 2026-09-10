import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Eye } from "lucide-react";
import { Input } from "@/components/ui/input";
import type { FacilityDoctor, FacilitySummary } from "@/services/admin/admin.service";

interface FacilityDirectoryTableProps {
  facilities: FacilitySummary[];
  doctors?: FacilityDoctor[];
}

export function FacilityDirectoryTable({ facilities, doctors }: FacilityDirectoryTableProps) {
  const [query, setQuery] = useState("");
  const rows = useMemo(() => {
    const search = query.trim().toLowerCase();
    if (!search) return facilities;
    return facilities.filter((facility) =>
      [facility.code, facility.name, facility.address, facility.category].some((value) =>
        value.toLowerCase().includes(search),
      ),
    );
  }, [facilities, query]);

  if (doctors) {
    return (
      <div className="space-y-4">
        <Input
          placeholder="Search by doctor, specialty or hospital"
          aria-label="Search doctors"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          className="sm:max-w-sm"
        />
        <div className="overflow-x-auto rounded-2xl border border-border bg-surface/70">
          <table className="w-full min-w-max text-left text-sm">
            <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-semibold">Doctor</th>
                <th className="px-4 py-3 font-semibold">Specialty</th>
                <th className="px-4 py-3 font-semibold">Hospital</th>
                <th className="px-4 py-3 font-semibold">Qualification</th>
                <th className="px-4 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {doctors
                .filter((doctor) =>
                  `${doctor.name} ${doctor.specialty}`.toLowerCase().includes(query.toLowerCase()),
                )
                .map((doctor) => {
                  const hospital = facilities.find((facility) =>
                    facility.doctors?.some((item) => item.id === doctor.id),
                  );
                  return (
                    <tr key={doctor.id} className="border-b border-border/60 last:border-0">
                      <td className="px-4 py-3 font-medium">{doctor.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{doctor.specialty}</td>
                      <td className="px-4 py-3">
                        <Link
                          className="text-primary hover:underline"
                          to="/admin/facilities/$slug"
                          params={{ slug: hospital?.slug ?? "" }}
                        >
                          {hospital?.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground">{doctor.qualification}</td>
                      <td className="px-4 py-3">
                        <StatusPill status={doctor.status} />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Search by code, name or area"
        aria-label="Search facilities"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        className="sm:max-w-sm"
      />
      <div className="overflow-x-auto rounded-2xl border border-border bg-surface/70">
        <table className="w-full min-w-max text-left text-sm">
          <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-semibold">Code</th>
              <th className="px-4 py-3 font-semibold">Name</th>
              <th className="px-4 py-3 font-semibold">Address</th>
              <th className="px-4 py-3 font-semibold">Type</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((facility) => (
              <tr key={facility.slug} className="border-b border-border/60 last:border-0">
                <td className="px-4 py-3 font-medium">{facility.code}</td>
                <td className="px-4 py-3">{facility.name}</td>
                <td className="px-4 py-3 text-muted-foreground">
                  {facility.address}, {facility.city}
                </td>
                <td className="px-4 py-3 text-muted-foreground">{facility.category}</td>
                <td className="px-4 py-3">
                  <StatusPill status={facility.status} />
                </td>
                <td className="px-4 py-3">
                  <Link
                    to="/admin/facilities/$slug"
                    params={{ slug: facility.slug }}
                    className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline"
                  >
                    <Eye className="size-4" aria-hidden="true" /> View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-xs text-muted-foreground">
        Only basic registration and public directory information is shown in the admin directory.
      </p>
    </div>
  );
}

function StatusPill({ status }: { status: "Active" | "Inactive" }) {
  return (
    <span
      className={
        status === "Active"
          ? "inline-flex rounded-full border border-success/30 bg-success/10 px-2.5 py-1 text-xs font-semibold text-success"
          : "inline-flex rounded-full border border-border bg-secondary px-2.5 py-1 text-xs font-semibold text-muted-foreground"
      }
    >
      {status}
    </span>
  );
}
