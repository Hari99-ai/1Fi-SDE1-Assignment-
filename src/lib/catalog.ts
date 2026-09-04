import { readFile } from "node:fs/promises";
import { join } from "node:path";

export type EmiPlan = {
  id: string;
  months: number;
  interestRate: number;
  monthlyPayment: number;
  cashback: number;
  fundBacked: string;
  note: string;
};

export type Variant = {
  id: string;
  label: string;
  storage: string;
  color: string;
  image: string;
  mrp: number;
  price: number;
};

export type Product = {
  id: string;
  slug: string;
  name: string;
  brand: string;
  category: string;
  description: string;
  image: string;
  mrp: number;
  price: number;
  variants: Variant[];
  emiPlans: EmiPlan[];
  highlights: string[];
};

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
