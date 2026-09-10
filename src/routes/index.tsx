import { createFileRoute } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/features/home/HeroSection";
import { StatsSection } from "@/features/home/StatsSection";
import { ServicesSection } from "@/features/home/ServicesSection";
import { FeaturedRetailers } from "@/features/home/FeaturedRetailers";
import { FeaturedWholesalers } from "@/features/home/FeaturedWholesalers";
import { MemberCta } from "@/features/home/MemberCta";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Kakinada Union — Pharmacy Healthcare Association" },
      {
        name: "description",
        content:
          "Kakinada Union represents 500+ retail and wholesale pharmacy members with regulatory support, networking and a secure member portal.",
      },
      { property: "og:title", content: "Kakinada Union — Pharmacy Healthcare Association" },
      {
        property: "og:description",
        content:
          "The united voice of Kakinada's pharmacy community: 500+ retailer and wholesaler members, regulatory support and a secure member portal.",
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <PublicLayout>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturedRetailers />
      <FeaturedWholesalers />
      <MemberCta />
    </PublicLayout>
  );
}
