"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { EmiPlan, Product, Variant } from "@/lib/catalog";

type Props = {
  product: Product;
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export function ProductPageClient({ product }: Props) {
  const router = useRouter();
  const [selectedVariantId, setSelectedVariantId] = useState(product.variants[0]?.id ?? "");
  const [selectedPlanId, setSelectedPlanId] = useState(product.emiPlans[0]?.id ?? "");

  const selectedVariant = useMemo<Variant | undefined>(
    () => product.variants.find((variant) => variant.id === selectedVariantId) ?? product.variants[0],
    [product.variants, selectedVariantId]
  );

  const selectedPlan = useMemo<EmiPlan | undefined>(
    () => product.emiPlans.find((plan) => plan.id === selectedPlanId) ?? product.emiPlans[0],
    [product.emiPlans, selectedPlanId]
  );

  const effectiveImage = selectedVariant?.image ?? product.image;
  const effectivePrice = selectedVariant?.price ?? product.price;
  const effectiveMrp = selectedVariant?.mrp ?? product.mrp;

  function handleProceed() {
    if (!selectedVariant || !selectedPlan) return;

    const params = new URLSearchParams({
      product: product.slug,
      variant: selectedVariant.id,
      plan: selectedPlan.id
    });

    router.push(`/checkout?${params.toString()}`);
  }

  return (
    <main className="page-shell">
      <section className="hero-grid">
        <div className="hero-copy">
          <div className="eyebrow">Product details</div>
          <h1>{product.name}</h1>
          <p className="lede">{product.description}</p>

          <div className="meta-row">
            <div>
              <span className="meta-label">Variant</span>
              <strong>{selectedVariant?.label ?? "N/A"}</strong>
            </div>
            <div>
              <span className="meta-label">MRP</span>
              <strong className="strike">{formatCurrency(effectiveMrp)}</strong>
            </div>
            <div>
              <span className="meta-label">Price</span>
              <strong>{formatCurrency(effectivePrice)}</strong>
            </div>
          </div>

          <div className="chips">
            {product.highlights.map((highlight) => (
              <span key={highlight} className="chip">
                {highlight}
              </span>
            ))}
          </div>
        </div>

        <div className="hero-card">
          <div className="product-art">
            <Image
              src={effectiveImage}
              alt={selectedVariant?.label ?? product.name}
              fill
              priority
              sizes="(max-width: 900px) 100vw, 40vw"
            />
          </div>
          <div className="product-card-footer">
            <span>{product.brand}</span>
            <strong>{product.category}</strong>
          </div>
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Choose a variant</h2>
          <p>Each product has multiple storage or color combinations loaded from the database.</p>
        </div>
        <div className="variant-grid">
          {product.variants.map((variant) => {
            const active = variant.id === selectedVariantId;
            return (
              <button
                key={variant.id}
                type="button"
                className={`choice-card ${active ? "active" : ""}`}
                onClick={() => setSelectedVariantId(variant.id)}
              >
                <span className="choice-label">{variant.label}</span>
                <span className="choice-subtle">
                  {variant.color} - {variant.storage}
                </span>
                <strong>{formatCurrency(variant.price)}</strong>
              </button>
            );
          })}
        </div>
      </section>

      <section className="panel">
        <div className="panel-head">
          <h2>Available EMI plans</h2>
          <p>Select the plan you want to take forward.</p>
        </div>

        <div className="emi-grid">
          {product.emiPlans.map((plan) => {
            const active = plan.id === selectedPlanId;
            return (
              <button
                key={plan.id}
                type="button"
                className={`emi-card ${active ? "active" : ""}`}
                onClick={() => setSelectedPlanId(plan.id)}
              >
                <div className="emi-topline">
                  <strong>{plan.months} months</strong>
                  <span>{plan.interestRate}% interest</span>
                </div>
                <div className="emi-value">{formatCurrency(plan.monthlyPayment)} / month</div>
                <div className="emi-info">Cashback: {formatCurrency(plan.cashback)}</div>
                <div className="emi-info">Fund-backed by: {plan.fundBacked}</div>
                <div className="emi-note">{plan.note}</div>
              </button>
            );
          })}
        </div>
      </section>

      <section className="summary-bar">
        <div>
          <span className="summary-label">Selected EMI</span>
          <strong>
            {selectedPlan?.months ?? 0} months at {selectedPlan?.interestRate ?? 0}% interest
          </strong>
        </div>
        <div>
          <span className="summary-label">Monthly payment</span>
          <strong>{formatCurrency(selectedPlan?.monthlyPayment ?? 0)}</strong>
        </div>
        <button type="button" className="primary-btn" onClick={handleProceed}>
          Proceed with selected plan
        </button>
      </section>
    </main>
  );
}
