export interface UserReduxEntity {
  id: string;
  email: string;
  password: string;
  userName: string;
  fullName: string;
  phone: string;
  address: string;
  role: false;
  status: true;
  created_at: string;
  update_at: string;
  token?: string;
}
