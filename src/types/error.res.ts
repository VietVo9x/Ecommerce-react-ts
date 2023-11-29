export interface Res_Err_User_Register {
  message: string;
  errors: {
    msgEmail: string;
  };
}
export interface Res_Err_User_Login {
  message: string;
  errors: {
    emailMessage?: string;
    passwordMessage?: string;
  } | null;
}
export interface Res_Err_Cart {
  message: string;
  errors: null;
}
