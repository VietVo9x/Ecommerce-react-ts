export interface I_UserRegister {
  userName: string;
  email: string;
  fullName: string;
  password: string;
  repeatPassword: string;
  phone: string;
  address: string;
}
export interface I_RegisterError {
  msgEmail: string | null;
  msgPhone: string | null;
  msgUserName: string | null;
  msgFullName: string | null;
  msgAddress: string | null;
  msgPassword: string | null;
  msgPasswordConfirm: string | null;
}
