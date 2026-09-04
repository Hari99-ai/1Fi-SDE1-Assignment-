CREATE TABLE products (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  brand TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  mrp INTEGER NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE variants (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  storage TEXT NOT NULL,
  color TEXT NOT NULL,
  image TEXT NOT NULL,
  mrp INTEGER NOT NULL,
  price INTEGER NOT NULL
);

CREATE TABLE emi_plans (
  id TEXT PRIMARY KEY,
  product_id TEXT NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  months INTEGER NOT NULL,
  interest_rate REAL NOT NULL,
  monthly_payment INTEGER NOT NULL,
  cashback INTEGER NOT NULL DEFAULT 0,
  fund_backed TEXT NOT NULL,
  note TEXT NOT NULL
);
