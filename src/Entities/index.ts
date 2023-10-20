export interface UserEntities {
  id: string;
  email: string;
  password: string;
  userName: string;
  fullName: string;
  phone: string;
  address: string;
  cart: [];
  role: false;
  status: true;
  created_at: string;
  update_at: string;
  token?: string;
}
export interface ProductEntities {
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
