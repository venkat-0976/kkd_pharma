import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Hospital, MapPin, Phone, UserRound } from "lucide-react";
import { AdminPageHeader } from "@/features/admin/AdminShell";
import { adminService } from "@/services/admin/admin.service";

export const Route = createFileRoute("/admin/facilities/$slug")({
  loader: async ({ params }) => {
    const facility = await adminService.getFacility(params.slug);
    if (!facility) throw notFound();
    return { facility };
  },
  component: AdminFacilityDetailPage,
});

function AdminFacilityDetailPage() {
  const { facility } = Route.useLoaderData();
  return (
    <div>
      <Link
        to={
          facility.category.includes("hospital")
            ? "/admin/hospitals"
            : facility.category === "Diagnostic laboratory"
              ? "/admin/labs"
              : "/admin/blood-banks"
        }
        className="mb-5 inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="size-4" aria-hidden="true" /> Back to directory
      </Link>
      <AdminPageHeader
        title={facility.name}
        description={`${facility.code} · ${facility.category}`}
      />
      <div className="grid gap-4 sm:grid-cols-3">
        <InfoCard icon={Hospital} label="Registration code" value={facility.code} />
        <InfoCard icon={MapPin} label="Address" value={`${facility.address}, ${facility.city}`} />
        <InfoCard icon={Phone} label="Contact" value={facility.phone} />
      </div>
      {facility.doctors ? (
        <section className="mt-6">
          <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
            <UserRound className="size-5 text-primary" aria-hidden="true" /> Doctors and specialties
          </h2>
          <div className="overflow-x-auto rounded-2xl border border-border bg-surface/70">
            <table className="w-full min-w-3xl text-left text-sm">
              <thead className="border-b border-border text-xs uppercase tracking-wide text-muted-foreground">
                <tr>
                  <th className="px-4 py-3">Doctor</th>
                  <th className="px-4 py-3">Specialty</th>
                  <th className="px-4 py-3">Qualification</th>
                  <th className="px-4 py-3">Registration</th>
                  <th className="px-4 py-3">Experience</th>
                </tr>
              </thead>
              <tbody>
                {facility.doctors.map((doctor) => (
                  <tr key={doctor.id} className="border-b border-border/60 last:border-0">
                    <td className="px-4 py-3 font-medium">{doctor.name}</td>
                    <td className="px-4 py-3">{doctor.specialty}</td>
                    <td className="px-4 py-3 text-muted-foreground">{doctor.qualification}</td>
                    <td className="px-4 py-3 text-muted-foreground">{doctor.registrationNumber}</td>
                    <td className="px-4 py-3 text-muted-foreground">{doctor.experience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-muted-foreground">
            Admin view shows basic professional information only. Sensitive documents and personal
            contact details remain private.
          </p>
        </section>
      ) : null}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Hospital;
  label: string;
  value: string;
}) {
  return (
    <div className="card-elevated p-5">
      <Icon className="size-5 text-primary" aria-hidden="true" />
      <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 font-medium">{value}</p>
    </div>
  );
}
