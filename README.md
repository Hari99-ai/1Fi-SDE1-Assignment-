# EMI Products Demo

Simple full-stack product catalog for the SDE1 assignment. It includes:

- Dynamic product pages at `/products/[slug]`
- Backend APIs at `/api/products` and `/api/products/[slug]`
- File-backed catalog data loaded at runtime
- Three products with multiple variants and EMI plans each
- A responsive product detail experience with EMI plan selection
- The assignment reference image surfaced in the UI from `public/reference/page1-2.png`
- External product-page reference: https://snapmint.com/p/apple-iphone-17-pro-silver-256-gb-smart-phones-on-emi
- The iPhone product art is extracted from the reference screenshot and reused across product, detail, and checkout views

## Tech Stack

- Frontend: Next.js 15, React 19, CSS
- Backend: Next.js route handlers
- Database layer: file-backed JSON catalog, plus SQL schema/seed files for a relational migration path

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Pages

- `/` product list
- `/products/iphone-17-pro`
- `/products/samsung-s24-ultra`
- `/products/pixel-9-pro`
- `/checkout?product=...&variant=...&plan=...`

## API Endpoints

### `GET /api/products`

Response:

```json
{
  "products": [
    {
      "id": "iphone-17-pro",
      "slug": "iphone-17-pro",
      "name": "iPhone 17 Pro",
      "brand": "Apple",
      "category": "Smartphones",
      "image": "/products/iphone-17-pro-main.svg",
      "mrp": 149900,
      "price": 134900,
      "variantCount": 3,
      "planCount": 3,
      "description": "Premium flagship with a titanium frame, advanced camera system, and fast charging support."
    }
  ]
}
```

### `GET /api/products/:slug`

Response:

```json
{
  "product": {
    "id": "iphone-17-pro",
    "slug": "iphone-17-pro",
    "name": "iPhone 17 Pro",
    "variants": [],
    "emiPlans": []
  }
}
```

## Schema

See:

- `database/schema.sql`
- `database/seed.sql`

The relational schema includes:

- `products`
- `variants`
- `emi_plans`

## Data Files

- `database/products.json` is the runtime catalog source used by the APIs
- `database/seed.sql` mirrors the same content for easy import into SQL
- `public/products/*.svg` contains the product visuals used by the cards and detail pages
- `public/reference/page1-2.png` is the reference image extracted from the assignment PDF
- The Snapmint product page above is the external UI reference used for layout and content cues
- `public/products/iphone-17-pro-extracted.png` is the extracted reusable product image used in the live catalog

## Notes

- Product data is not hardcoded in the UI. The pages fetch through the backend API.
- Each product has a unique URL and at least two variants.
- The homepage includes a reference panel that displays the extracted assignment image alongside the implemented catalog and a link to the Snapmint example.

## Next steps for submission

- Run the app locally and capture a 2 to 5 minute demo video.
- Deploy to Vercel or a similar platform.
- Upload the video to a shareable Drive or YouTube link.





npm.cmd install
npm.cmd run dev
