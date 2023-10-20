export interface I_product {
  sku: string;
  category_name: string;
  product_name: string;
  description: string;
  unit_price: string;
  stock_quantity: string;
  image: string;
  created_at: string;
  updated_at: string;
  id: string;
  new?: boolean;
  bestDeal?: boolean;
  bestSelling?: boolean;
}
export interface I_productUser {
  sku: string;
  category_name: string;
  product_name: string;
  description: string;
  unit_price: string;
  id: string;
  image: string;
  created_at: string;
  updated_at: string;
  quantity: number;
  new?: boolean;
  bestDeal?: boolean;
  bestSelling?: boolean;
}