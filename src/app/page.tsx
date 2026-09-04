import { HomePage } from "@/components/home-page";
import { getAbsoluteUrl } from "@/lib/url";

export default async function Home() {
  const response = await fetch(await getAbsoluteUrl("/api/products"), {
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error("Failed to load products");
  }

  const data = (await response.json()) as {
    products: Array<{
      id: string;
      slug: string;
      name: string;
      brand: string;
      category: string;
      image: string;
      mrp: number;
      price: number;
      variantCount: number;
      planCount: number;
      description: string;
    }>;
  };

  return <HomePage products={data.products} />;
}
