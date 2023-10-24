import { I_productUser } from '../types/ProductsType';

export interface UserEntities {
  id: string;
  email: string;
  password: string;
  userName: string;
  fullName: string;
  phone: string;
  address: string;
  cart: I_productUser[];
  role: false;
  status: true;
  created_at: string;
  update_at: string;
}
export interface ProductEntities {
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
  new: boolean;
  bestDeal: boolean;
  bestSelling: boolean;
}
export interface categoryEntities {
  category_name: string;
  description: string;
  status: boolean;
  category_id: string;
  products: ProductEntities[];
}
