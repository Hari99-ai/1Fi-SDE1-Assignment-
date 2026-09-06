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
