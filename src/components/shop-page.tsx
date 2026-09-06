"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/lib/types";

type ShopPageProps = {
  products: Product[];
  error?: string;
};

type ShopTab = "top-brands" | "nearby-stores" | "marketplace";

const SHOP_TABS: Array<{ id: ShopTab; label: string; description: string }> = [
  { id: "top-brands", label: "Top Brands", description: "No implementation required" },
  { id: "nearby-stores", label: "Nearby Stores", description: "No implementation required" },
  { id: "marketplace", label: "1Fi Marketplace", description: "Browse products and EMI plans" }
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export function ShopPage({ products, error }: ShopPageProps) {
  const [activeTab, setActiveTab] = useState<ShopTab>("marketplace");
  const [activeProductSlug, setActiveProductSlug] = useState(products[0]?.slug ?? "");

  const activeProduct = useMemo(
    () => products.find((product) => product.slug === activeProductSlug) ?? products[0],
    [activeProductSlug, products]
  );

  const [selectedVariantId, setSelectedVariantId] = useState(activeProduct?.variants[0]?.id ?? "");
  const [selectedPlanId, setSelectedPlanId] = useState(activeProduct?.emiPlans[0]?.id ?? "");

  useEffect(() => {
    setSelectedVariantId(activeProduct?.variants[0]?.id ?? "");
    setSelectedPlanId(activeProduct?.emiPlans[0]?.id ?? "");
  }, [activeProduct?.slug]);

  const selectedVariant =
    activeProduct?.variants.find((variant) => variant.id === selectedVariantId) ??
    activeProduct?.variants[0];
  const selectedPlan =
    activeProduct?.emiPlans.find((plan) => plan.id === selectedPlanId) ?? activeProduct?.emiPlans[0];
  const effectivePrice = selectedVariant?.price ?? activeProduct?.price ?? 0;
  const effectiveMrp = selectedVariant?.mrp ?? activeProduct?.mrp ?? 0;
  const selectedParams =
    activeProduct && selectedVariant && selectedPlan
      ? new URLSearchParams({
          product: activeProduct.slug,
          variant: selectedVariant.id,
          plan: selectedPlan.id
        }).toString()
      : "";

  return (
    <main className="page-shell shop-shell">
      <section className="home-hero shop-hero">
        <div className="eyebrow">1Fi Shop</div>
        <h1>Shop the 1Fi experience</h1>
        <p>
          Explore the existing Shop surface with the assignment-defined Marketplace section,
          including product browsing, EMI plan selection, and a clean proceed flow.
        </p>
      </section>

      <section className="shop-tabs" aria-label="Shop sections">
        {SHOP_TABS.map((tab) => {
          const active = tab.id === activeTab;
          return (
            <button
              key={tab.id}
              type="button"
              className={`shop-tab ${active ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span>{tab.label}</span>
              <small>{tab.description}</small>
            </button>
          );
        })}
      </section>

      {activeTab === "top-brands" ? (
        <section className="panel shop-empty-panel">
          <div className="panel-head">
            <h2>Top Brands</h2>
            <p>This section is intentionally left blank for the assignment brief.</p>
          </div>
          <div className="empty-stage" />
        </section>
      ) : null}

      {activeTab === "nearby-stores" ? (
        <section className="panel shop-empty-panel">
          <div className="panel-head">
            <h2>Nearby Stores</h2>
            <p>This section is intentionally left blank for the assignment brief.</p>
          </div>
          <div className="empty-stage" />
        </section>
      ) : null}

      {activeTab === "marketplace" ? (
        <>
          <section className="marketplace-hero">
            <div>
              <div className="eyebrow">Marketplace</div>
              <h2>Browse products and select an EMI plan</h2>
              <p>
                Product content, pricing, variants, and EMI plans are loaded from the catalog API
                so the UI stays dynamic and easy to extend.
              </p>
            </div>
            <div className="marketplace-summary">
              <div>
                <span className="summary-label">Products</span>
                <strong>{products.length}</strong>
              </div>
              <div>
                <span className="summary-label">EMI plans</span>
                <strong>{products.reduce((total, product) => total + product.emiPlans.length, 0)}</strong>
              </div>
              <div>
                <span className="summary-label">Starting from</span>
                <strong>
                  {products.length > 0
                    ? formatCurrency(Math.min(...products.map((product) => product.price)))
                    : formatCurrency(0)}
                </strong>
              </div>
            </div>
          </section>

          {error ? (
            <section className="panel status-panel">
              <div className="panel-head">
                <h2>Marketplace unavailable</h2>
                <p>{error}</p>
              </div>
            </section>
          ) : null}

          {!error && products.length === 0 ? (
            <section className="panel status-panel">
              <div className="panel-head">
                <h2>No products found</h2>
                <p>The marketplace API returned an empty catalog.</p>
              </div>
            </section>
          ) : null}

          {!error && products.length > 0 ? (
            <section className="marketplace-layout">
              <div className="marketplace-list">
                {products.map((product) => {
                  const active = product.slug === activeProduct?.slug;
                  return (
                    <button
                      key={product.id}
                      type="button"
                      className={`marketplace-card ${active ? "active" : ""}`}
                      onClick={() => setActiveProductSlug(product.slug)}
                    >
                      <div className="marketplace-card-image">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes="(max-width: 900px) 100vw, 28vw"
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                      <div className="marketplace-card-body">
                        <div className="tile-kicker">
                          {product.brand} - {product.category}
                        </div>
                        <h3>{product.name}</h3>
                        <p>{product.description}</p>
                        <div className="tile-stats">
                          <span>{product.variants.length} variants</span>
                          <span>{product.emiPlans.length} EMI plans</span>
                        </div>
                        <div className="tile-prices">
                          <strong>{formatCurrency(product.price)}</strong>
                          <span className="strike">{formatCurrency(product.mrp)}</span>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {activeProduct ? (
                <aside className="panel marketplace-detail">
                  <div className="panel-head">
                    <div className="eyebrow">Selected product</div>
                    <h2>{activeProduct.name}</h2>
                    <p>{activeProduct.description}</p>
                  </div>

                  <div className="marketplace-spotlight">
                    <div className="hero-card marketplace-art">
                      <div className="product-art marketplace-product-art">
                        <Image
                          src={selectedVariant?.image ?? activeProduct.image}
                          alt={selectedVariant?.label ?? activeProduct.name}
                          fill
                          priority
                          sizes="(max-width: 900px) 100vw, 35vw"
                        />
                      </div>
                      <div className="product-card-footer">
                        <span>{activeProduct.brand}</span>
                        <strong>{activeProduct.category}</strong>
                      </div>
                    </div>

                    <div className="marketplace-copy">
                      <div className="meta-row">
                        <div>
                          <span className="meta-label">Price</span>
                          <strong>{formatCurrency(effectivePrice)}</strong>
                        </div>
                        <div>
                          <span className="meta-label">MRP</span>
                          <strong className="strike">{formatCurrency(effectiveMrp)}</strong>
                        </div>
                        <div>
                          <span className="meta-label">Variant</span>
                          <strong>{selectedVariant?.label ?? "N/A"}</strong>
                        </div>
                      </div>

                      <div className="chips">
                        {activeProduct.highlights.map((highlight) => (
                          <span key={highlight} className="chip">
                            {highlight}
                          </span>
                        ))}
                      </div>

                      <div className="selector-group">
                        <div className="selector-label">Choose variant</div>
                        <div className="choice-grid compact-grid">
                          {activeProduct.variants.map((variant) => {
                            const variantActive = variant.id === (selectedVariant?.id ?? "");
                            return (
                              <button
                                key={variant.id}
                                type="button"
                                className={`choice-card ${variantActive ? "active" : ""}`}
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
                      </div>

                      <div className="selector-group">
                        <div className="selector-label">Choose EMI plan</div>
                        <div className="emi-grid compact-grid">
                          {activeProduct.emiPlans.map((plan) => {
                            const planActive = plan.id === (selectedPlan?.id ?? "");
                            return (
                              <button
                                key={plan.id}
                                type="button"
                                className={`emi-card ${planActive ? "active" : ""}`}
                                onClick={() => setSelectedPlanId(plan.id)}
                              >
                                <div className="emi-topline">
                                  <strong>{plan.months} months</strong>
                                  <span>{plan.interestRate}% interest</span>
                                </div>
                                <div className="emi-value">
                                  {formatCurrency(plan.monthlyPayment)} / month
                                </div>
                                <div className="emi-info">Cashback: {formatCurrency(plan.cashback)}</div>
                                <div className="emi-info">Fund-backed by: {plan.fundBacked}</div>
                                <div className="emi-note">{plan.note}</div>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="summary-bar marketplace-summary-bar">
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
                        <Link
                          className={`primary-btn ${!selectedParams ? "is-disabled" : ""}`}
                          href={selectedParams ? `/checkout?${selectedParams}` : "#"}
                          aria-disabled={!selectedParams}
                          onClick={(event) => {
                            if (!selectedParams) {
                              event.preventDefault();
                            }
                          }}
                        >
                          Proceed with selected plan
                        </Link>
                      </div>
                    </div>
                  </div>
                </aside>
              ) : null}
            </section>
          ) : null}
        </>
      ) : null}
    </main>
  );
}
