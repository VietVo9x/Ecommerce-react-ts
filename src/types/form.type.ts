export interface F_UserRegister {
  user_name: string;
  email: string;
  password: string;
  confirm_password: string;
}
export interface F_UserLogin {
  email: string;
  password: string;
}
export interface F_ProductCart {
  product_id: number;
  quantity: number;
}
