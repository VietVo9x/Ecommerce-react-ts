export interface Res_UserLogin {
  token: string;
}
export interface Res_UserInfoLogin {
  id: number;
  user_name: string;
  full_name: string;
  status: number;
  role: number;
  email: string;
  phone: string;
  address: string;
  avatar: string | null;
  created_at: string;
  updated_at: string;
  deletedAt: null;
}
export interface Res_Category {
  id: number;
  category_name: string;
  description: string;
  status: number;
  deleteAt: null | number;
}
export interface Res_Product {
  id: number;
  product_name: string;
  price: number;
  sku: string;
  quantity_stock: number;
  description: string;
  category: {
    category_name: string;
  };
  imageProducts: {
    image_url: string;
  }[];
}

export interface Res_Cart {
  id: number;
  quantity: number;
  product: {
    product_name: string;
    price: number;
    id: number;
    imageProducts: {
      image_url: string;
    }[];
  };
}
