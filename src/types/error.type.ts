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
