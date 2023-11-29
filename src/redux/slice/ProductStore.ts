import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface I_productState {
  data: any[];
}
const initialState: I_productState = {
  data: [],
};
const productSlice = createSlice({
  name: 'product', // ten luu tru trong store truy van tu useSelector
  initialState: initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<any[]>) => {
      state.data = action.payload;
    },
  },
});

export const { getProducts } = productSlice.actions; //lay action ra cho dispatch su dung
export default productSlice.reducer; // cung cap reducer
