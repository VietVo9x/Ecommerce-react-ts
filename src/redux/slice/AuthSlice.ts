import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserReduxEntity } from '../../types/login.response';
export interface I_authState {
  isLogin: boolean;
  user: undefined | UserReduxEntity;
}
const initialState = {
  isLogin: false,
  user: undefined,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state: I_authState, action: PayloadAction<UserReduxEntity>) => {
      state.user = action.payload;
      state.isLogin = true;
    },
    logout: (state: I_authState, action: PayloadAction) => {
      state.user = undefined;
      state.isLogin = false;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
