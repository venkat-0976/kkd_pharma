import { createFileRoute, notFound } from "@tanstack/react-router";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { BusinessDetail } from "@/features/directory/BusinessDetail";
import { getWholesalerBySlug } from "@/services/directory/wholesalers.service";

export const Route = createFileRoute("/wholesalers/$slug")({
  loader: ({ params }) => {
    const business = getWholesalerBySlug(params.slug);
    if (!business) throw notFound();
    return { business };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [{ title: "Wholesaler not found — Kakinada Union" }, { name: "robots", content: "noindex" }],
      };
    }
    const { business } = loaderData;
    const description = `${business.shopName} — ${business.businessType} member of Kakinada Union in ${business.area}, ${business.city}.`;
    return {
      meta: [
        { title: `${business.shopName} — Kakinada Union Wholesaler` },
        { name: "description", content: description },
        { property: "og:title", content: `${business.shopName} — Kakinada Union` },
        { property: "og:description", content: description },
      ],
    };
  },
  component: WholesalerDetailPage,
});

function WholesalerDetailPage() {
  const { business } = Route.useLoaderData();
  return (
    <PublicLayout>
      <BusinessDetail business={business} />
    </PublicLayout>
  );
}
