import { NextResponse } from "next/server";
import { getMarketplaceProducts } from "@/lib/catalog";

export async function GET() {
  const products = await getMarketplaceProducts();
  return NextResponse.json({ products });
}
