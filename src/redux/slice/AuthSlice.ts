import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Res_UserInfoLogin } from '../../types/response.type';
export interface I_authState {
  isLogin: boolean;
  user: undefined | Res_UserInfoLogin;
}
const initialState = {
  isLogin: false,
  user: undefined,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginSuccess: (state: I_authState, action: PayloadAction<Res_UserInfoLogin>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    loginfailed: (state: I_authState, action: PayloadAction<undefined>) => {
      state.user = action.payload;
      state.isLogin = false;
    },
    logout: (state: I_authState, action: PayloadAction) => {
      state.user = undefined;
      state.isLogin = false;
    },
  },
});
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
