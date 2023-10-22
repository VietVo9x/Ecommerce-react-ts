export interface I_product {
  sku: string;
  category_name: string;
  product_name: string;
  description: string;
  unit_price: number;
  stock_quantity: number;
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
  unit_price: number;
  id: string;
  image: string;
  created_at: string;
  updated_at: string;
  quantity: number;
  new?: boolean;
  bestDeal?: boolean;
  bestSelling?: boolean;
}
