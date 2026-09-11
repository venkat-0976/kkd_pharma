import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/components/common/HeroSection";
import { StatsSection } from "@/components/common/StatsSection";
import { ServicesSection } from "@/components/common/ServicesSection";
import { FeaturedRetailers } from "@/components/common/FeaturedRetailers";
import { FeaturedWholesalers } from "@/components/common/FeaturedWholesalers";
import { MemberCta } from "@/components/common/MemberCta";

export function HomePage() {
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

export default HomePage;
