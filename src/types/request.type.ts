export interface Req_UserRegister {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
export interface Req_UserLogin {
  email: string;
  password: string;
}
export interface Req_ProductCart {
  product_id: number;
  quantity: number;
}
export interface Req_CartUpdate {
  id: number;
  quantity: number;
}
export interface Req_Checkout_Address {
  full_name: string;
  address: string;
  phone: string;
  province: string;
  city: string;
}
export interface Req_UserUpdate {
  email: string;
  user_name: string;
  full_name: string;
  phone: string;
  address: string;
}
