import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ContactForm } from "@/components/common/ContactForm";
import { brand } from "@/utils/navigation";

const details = [
  { icon: MapPin, label: "Office", value: brand.address },
  { icon: Phone, label: "Phone", value: brand.phone },
  { icon: Mail, label: "Email", value: brand.email },
  { icon: Clock, label: "Office hours", value: "Monday – Saturday, 10:00 AM – 6:00 PM" },
];

export function ContactPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Contact"
        title="Talk to the union office"
        description="Membership queries, licence guidance, event participation or general enquiries — we respond within two working days."
      />

      <section className="container-page section-y">
        <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
          <div className="space-y-4">
            {details.map((d) => {
              const Icon = d.icon;
              return (
                <div key={d.label} className="card-elevated flex gap-4 p-5">
                  <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                      {d.label}
                    </p>
                    <p className="mt-1 text-sm">{d.value}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="card-elevated p-6">
            <SectionHeading title="Send an enquiry" />
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      <section className="container-page pb-16">
        <div className="overflow-hidden rounded-2xl border border-border shadow-soft">
          <iframe
            title="Kakinada Union office location on Google Maps"
            src="https://www.google.com/maps?q=Kakinada%2C%20Andhra%20Pradesh&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-[320px] w-full border-0 sm:h-[420px]"
          />
        </div>
      </section>
    </PublicLayout>
  );
}

export default ContactPage;
