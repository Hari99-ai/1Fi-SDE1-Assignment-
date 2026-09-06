import { notFound } from "next/navigation";
import { ProductPageClient } from "@/components/product-page";
import type { Product } from "@/lib/types";
import { getAbsoluteUrl } from "@/lib/url";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProductDetailsPage({ params }: PageProps) {
  const { slug } = await params;
  const response = await fetch(await getAbsoluteUrl(`/api/products/${slug}`), {
    cache: "no-store"
  });

  if (response.status === 404) {
    notFound();
  }

  if (!response.ok) {
    throw new Error("Failed to load product");
  }

  const data = (await response.json()) as { product: Product };

  return <ProductPageClient product={data.product} />;
}
