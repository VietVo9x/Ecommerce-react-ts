import { I_productUser } from './ProductsType';

export interface UserReduxEntity {
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
  token?: string;
}
