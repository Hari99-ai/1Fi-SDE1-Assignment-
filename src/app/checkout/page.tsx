import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAbsoluteUrl } from "@/lib/url";

type CheckoutProps = {
  searchParams: Promise<{
    product?: string;
    variant?: string;
    plan?: string;
  }>;
};

export default async function CheckoutPage({ searchParams }: CheckoutProps) {
  const resolved = await searchParams;
  const productSlug = resolved.product;

  if (!productSlug) {
    notFound();
  }

  const response = await fetch(await getAbsoluteUrl(`/api/products/${productSlug}`), {
    cache: "no-store"
  });

  if (!response.ok) {
    notFound();
  }

  const payload = (await response.json()) as {
    product: {
      name: string;
      slug: string;
      image: string;
      description: string;
      variants: Array<{ id: string; label: string }>;
      emiPlans: Array<{ id: string; months: number; monthlyPayment: number; interestRate: number }>;
    };
  };

  const variant = payload.product.variants.find((item) => item.id === resolved.variant) ?? payload.product.variants[0];
  const plan = payload.product.emiPlans.find((item) => item.id === resolved.plan) ?? payload.product.emiPlans[0];

  return (
    <main className="page-shell">
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Proceeding to checkout</div>
          <h1>{payload.product.name}</h1>
          <p className="lede">{payload.product.description}</p>

          <div className="meta-row">
            <div>
              <span className="meta-label">Selected variant</span>
              <strong>{variant?.label ?? "Unknown"}</strong>
            </div>
            <div>
              <span className="meta-label">Selected plan</span>
              <strong>
                {plan?.months ?? 0} months at {plan?.interestRate ?? 0}% interest
              </strong>
            </div>
            <div>
              <span className="meta-label">Monthly payment</span>
              <strong>INR {plan?.monthlyPayment ?? 0}</strong>
            </div>
          </div>
        </div>

        <div className="hero-card">
          <div className="product-art">
            <Image
              src={payload.product.image}
              alt={payload.product.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </div>
          <div className="product-card-footer">
            <span>Checkout preview</span>
            <strong>{payload.product.slug}</strong>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Confirm the selection</h2>
          <p>Review the selected variant and EMI plan before final submission.</p>
        </div>

        <Link className="secondary-btn" href={`/products/${payload.product.slug}`}>
          Back to product page
        </Link>
      </section>
    </main>
  );
}
