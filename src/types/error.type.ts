export interface Err_UserRegister {
  isError: boolean;
  msgEmail: string;
  msgUserName: string;
  msgPassword: string;
  msgPasswordConfirm: string;
}
export interface Err_UserLogin {
  isError: boolean;
  msgEmail: string;
  msgPassword: string;
}
export interface Err_Checkout_AddressForm {
  isError: boolean;
  msgFullName: string;
  msgAddress: string;
  msgPhone: string;
  msgProvince: string;
  msgCity: string;
}
