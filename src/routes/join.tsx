import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { PageHero } from "@/components/common/PageHero";
import { PrivacyNotice } from "@/components/common/PrivacyNotice";
import { MembershipApplicationForm } from "@/components/forms/MembershipApplicationForm";

export const Route = createFileRoute("/join")({
  head: () => ({
    meta: [
      { title: "Apply for Membership — Kakinada Union" },
      {
        name: "description",
        content:
          "Apply to join Kakinada Union as a retail or wholesale pharmacy member and access the secure member portal.",
      },
      { property: "og:title", content: "Apply for Membership — Kakinada Union" },
      {
        property: "og:description",
        content: "Join Kakinada Union as a retailer or wholesaler member.",
      },
    ],
  }),
  component: JoinPage,
});

const benefits = [
  "Regulatory and licence renewal support",
  "Automatic expiry reminders for every licence",
  "Group insurance and welfare programmes",
  "Continuing education for pharmacists",
  "Listing in the public member directory",
  "Secure private document vault",
];

function JoinPage() {
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
                    <span aria-hidden="true" className="mt-2 size-1.5 shrink-0 rounded-full bg-primary" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <PrivacyNotice message="This form collects basic firm details only. Licences, Aadhaar, GST and other documents are collected later inside the secure member portal." />
            <div className="card-elevated p-6">
              <h2 className="text-base font-semibold">Already registered?</h2>
              <Link to="/login" className="mt-2 inline-block text-sm font-semibold text-primary hover:underline">
                Sign in to the member portal
              </Link>
            </div>
          </aside>
        </div>
      </section>
    </PublicLayout>
  );
}
