import { Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { PrivacyNotice } from "@/components/common/PrivacyNotice";
import { MembershipApplicationForm } from "@/components/common/MembershipApplicationForm";

const benefits = [
  "Regulatory and licence renewal support",
  "Automatic expiry reminders for every licence",
  "Group insurance and welfare programmes",
  "Continuing education for pharmacists",
  "Listing in the public member directory",
  "Secure private document vault",
];

export function JoinPage() {
  return (
    <PublicLayout>
      <PageHero
        eyebrow="Membership"
        title="Join Kakinada Union"
        description="Registered retail and wholesale pharmacy firms in Kakinada are welcome to apply."
      />

      <section className="container-page section-y">
        <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr]">
          <MembershipApplicationForm />
          <aside className="space-y-4">
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold">What members get</h2>
              <ul className="mt-4 space-y-2.5 text-sm text-muted-foreground">
                {benefits.map((b) => (
                  <li key={b} className="flex gap-2">
                    <span
                      aria-hidden="true"
                      className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
                    />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <PrivacyNotice />
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}

export default JoinPage;
