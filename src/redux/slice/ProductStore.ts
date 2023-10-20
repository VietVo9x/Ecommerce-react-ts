import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { I_product } from '../../types/ProductsType';

interface I_productState {
  data: I_product[];
}
const initialState: I_productState = {
  data: [],
};
const productSlice = createSlice({
  name: 'product', // ten luu tru trong store truy van tu useSelector
  initialState: initialState,
  reducers: {
    getProducts: (state, action: PayloadAction<I_product[]>) => {
      state.data = action.payload;
    },
  },
});

export const { getProducts } = productSlice.actions; //lay action ra cho dispatch su dung
export default productSlice.reducer; // cung cap reducer
