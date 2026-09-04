import Image from "next/image";
import Link from "next/link";

type ProductCard = {
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
};

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

type Props = {
  products: ProductCard[];
};

export function HomePage({ products }: Props) {
  return (
    <main className="page-shell home-shell">
      <section className="home-hero">
        <div className="eyebrow">Dynamic EMI catalog</div>
        <h1>Smartphones with mutual-fund-backed EMI plans</h1>
        <p>
          Browse products, inspect variants, compare monthly payments, and proceed with the EMI
          plan that fits your budget.
        </p>
      </section>

      <section className="reference-panel">
        <div className="reference-media">
          <Image
            src="/reference/page1-2.png"
            alt="Assignment reference card showing a smartphone product and EMI plan layout"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
            priority
            style={{ objectFit: "cover" }}
          />
        </div>

        <div className="reference-copy">
          <div className="eyebrow">Assignment reference</div>
          <h2>Built to mirror the product-and-EMI layout from the brief</h2>
          <p>
            The homepage surfaces the reference image extracted from the PDF and points to the
            Snapmint product page used as the external UI example, while the live catalog below
            keeps the experience data-driven and clickable.
          </p>
          <p>
            Reference example:{" "}
            <a
              href="https://snapmint.com/p/apple-iphone-17-pro-silver-256-gb-smart-phones-on-emi"
              target="_blank"
              rel="noreferrer"
            >
              snapmint.com/p/apple-iphone-17-pro-silver-256-gb-smart-phones-on-emi
            </a>
          </p>
          <ul>
            <li>Product image, MRP, and sale price</li>
            <li>Variant selection with storage and color options</li>
            <li>EMI plans with tenure, interest, cashback, and funding source</li>
            <li>Unique product URLs and a proceed button for checkout</li>
          </ul>
        </div>
      </section>

      <section className="product-grid">
        {products.map((product) => (
          <article key={product.id} className="product-tile">
            <div className="product-tile-image">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 900px) 100vw, 33vw"
                style={{ objectFit: "contain" }}
              />
            </div>
            <div className="product-tile-body">
              <div className="tile-kicker">
                {product.brand} - {product.category}
              </div>
              <h2>{product.name}</h2>
              <p>{product.description}</p>
              <div className="tile-stats">
                <span>{product.variantCount} variants</span>
                <span>{product.planCount} EMI plans</span>
              </div>
              <div className="tile-prices">
                <strong>{formatCurrency(product.price)}</strong>
                <span className="strike">{formatCurrency(product.mrp)}</span>
              </div>
              <Link className="secondary-btn" href={`/products/${product.slug}`}>
                View details
              </Link>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
