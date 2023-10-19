import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserReduxEntity } from '../../models/login.response';

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
  },
});
export const { login } = authSlice.actions;
export default authSlice.reducer;
