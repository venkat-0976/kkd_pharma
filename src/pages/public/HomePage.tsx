import { PublicLayout } from "@/components/layout/PublicLayout";
import { HeroSection } from "@/features/home/HeroSection";
import { StatsSection } from "@/features/home/StatsSection";
import { ServicesSection } from "@/features/home/ServicesSection";
import { FeaturedRetailers } from "@/features/home/FeaturedRetailers";
import { FeaturedWholesalers } from "@/features/home/FeaturedWholesalers";
import { MemberCta } from "@/features/home/MemberCta";

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
