import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Res_UserInfoLogin } from '../../types/response.type';
export interface I_authState {
  isLogin: boolean;
  user: Res_UserInfoLogin | null;
}
const initialState = {
  isLogin: false,
  user: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    loginSuccess: (state: I_authState, action: PayloadAction<Res_UserInfoLogin>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout: (state: I_authState) => {
      state.user = null;
      state.isLogin = false;
    },
  },
});
export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
