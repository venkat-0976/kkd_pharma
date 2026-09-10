import { useParams, Link } from "react-router-dom";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { BusinessDetail } from "@/features/directory/BusinessDetail";
import { getRetailerBySlug } from "@/services/directory/retailers.service";
import { getWholesalerBySlug } from "@/services/directory/wholesalers.service";
import { Button } from "@/components/ui/button";

export function BusinessDetailPage({ type }: { type: "Retailer" | "Wholesaler" }) {
  const { slug } = useParams<{ slug: string }>();
  const business =
    type === "Retailer" ? getRetailerBySlug(slug || "") : getWholesalerBySlug(slug || "");

  if (!business) {
    return (
      <PublicLayout>
        <div className="container-page py-20 text-center">
          <h1 className="text-2xl font-bold">Business not found</h1>
          <p className="mt-2 text-muted-foreground">
            The requested pharmacy or firm was not found in our directory.
          </p>
          <Button asChild className="mt-6">
            <Link to={type === "Retailer" ? "/retailers" : "/wholesalers"}>
              Back to {type === "Retailer" ? "Retailers" : "Wholesalers"}
            </Link>
          </Button>
        </div>
      </PublicLayout>
    );
  }

  return (
    <PublicLayout>
      <BusinessDetail business={business} />
    </PublicLayout>
  );
}

export default BusinessDetailPage;
