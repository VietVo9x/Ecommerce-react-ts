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
  isError: boolean;
  msgEmail: string;
  msgPhone: string;
  msgUserName: string;
  msgFullName: string;
  msgAddress: string;
  msgPassword: string;
  msgPasswordConfirm: string;
}
