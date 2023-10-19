import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserReduxEntity } from '../../models/login.response';
import { UserEntities } from '../../Entities';

export interface I_authState {
  isLogin: boolean;
  user: null | UserReduxEntity;
}
const initialState = {
  isLogin: false,
  user: null,
};
const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state: I_authState, action: PayloadAction) => {
      state.user = action.payload as unknown as UserReduxEntity;
      state.isLogin = true;
    },
    logout: (state: I_authState, action: PayloadAction) => {
      state.user = action.payload as unknown as UserEntities;
      state.isLogin = false;
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
