export interface I_UserLogin {
  email: string;
  password: string;
  isChecked: boolean;
}
export interface I_LoginError {
  isError: boolean;
  msgEmail: string;
  msgPassword: string;
}
