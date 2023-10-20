import { PayloadAction, createSlice } from '@reduxjs/toolkit';
export interface I_userLoginRedux {
  id: string;
  userName: string;
}
export interface I_authState {
  isLogin: boolean;
  user: null | I_userLoginRedux;
}
const initialState = {
  isLogin: false,
  user: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state: I_authState, action: PayloadAction<I_userLoginRedux>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout: (state: I_authState, action: PayloadAction) => {
      state.user = null;
      state.isLogin = false;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
