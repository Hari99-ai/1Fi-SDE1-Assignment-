import { ShopPage } from "@/components/shop-page";
import type { Product } from "@/lib/types";
import { getAbsoluteUrl } from "@/lib/url";

export default async function Home() {
  try {
    const response = await fetch(await getAbsoluteUrl("/api/marketplace"), {
      cache: "no-store"
    });

    if (!response.ok) {
      throw new Error("Failed to load marketplace");
    }

    const data = (await response.json()) as { products: Product[] };

    return <ShopPage products={data.products} />;
  } catch {
    return (
      <ShopPage
        products={[]}
        error="The marketplace catalog could not be loaded right now. Please try again shortly."
      />
    );
  }
}
