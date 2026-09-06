import { readFile } from "node:fs/promises";
import { join } from "node:path";
import type { Product } from "@/lib/types";

type CatalogFile = {
  products: Product[];
};

const dataPath = join(process.cwd(), "database", "products.json");

async function loadCatalog(): Promise<CatalogFile> {
  const raw = await readFile(dataPath, "utf8");
  return JSON.parse(raw) as CatalogFile;
}

export async function getAllProducts() {
  const catalog = await loadCatalog();
  return catalog.products.map((product) => ({
    id: product.id,
    slug: product.slug,
    name: product.name,
    brand: product.brand,
    category: product.category,
    image: product.image,
    mrp: product.mrp,
    price: product.price,
    variantCount: product.variants.length,
    planCount: product.emiPlans.length,
    description: product.description
  }));
}

export async function getProductBySlug(slug: string) {
  const catalog = await loadCatalog();
  return catalog.products.find((product) => product.slug === slug) ?? null;
}

export async function getFeaturedProducts() {
  const catalog = await loadCatalog();
  return catalog.products;
}

export async function getMarketplaceProducts() {
  return getFeaturedProducts();
}
