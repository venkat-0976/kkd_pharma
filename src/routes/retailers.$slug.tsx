import { createFileRoute, notFound } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { BusinessDetail } from "@/features/directory/BusinessDetail";
import { getRetailerBySlug } from "@/services/directory/retailers.service";

export const Route = createFileRoute("/retailers/$slug")({
  loader: ({ params }) => {
    const business = getRetailerBySlug(params.slug);
    if (!business) throw notFound();
    return { business };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Retailer not found — Kakinada Union" }, { name: "robots", content: "noindex" }] };
    }
    const { business } = loaderData;
    const description = `${business.shopName} — ${business.businessType} member of Kakinada Union in ${business.area}, ${business.city}.`;
    return {
      meta: [
        { title: `${business.shopName} — Kakinada Union Retailer` },
        { name: "description", content: description },
        { property: "og:title", content: `${business.shopName} — Kakinada Union` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: RetailerDetailPage,
});

function RetailerDetailPage() {
  const { business } = Route.useLoaderData();
  return (
    <PublicLayout>
      <BusinessDetail business={business} />
    </PublicLayout>
  );
}
