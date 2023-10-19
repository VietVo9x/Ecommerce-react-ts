import { PayloadAction, createSlice } from '@reduxjs/toolkit';

export interface I_productState {
  loading: boolean;
  data: string[];
}
const initialState: I_productState = {
  loading: false,
  data: [],
};
const productSlice: any = createSlice({
  name: 'product', // ten luu tru trong store truy van tu useSelector
  initialState: initialState,
  reducers: {
    addNewProduct: (state, action: PayloadAction<string>) => {
      state.data.push(action.payload);
    },
    updateProduct: (state, action: PayloadAction<{ index: number; data: string }>) => {
      state.data.splice(action.payload.index, 1, action.payload.data);
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      state.data.splice(action.payload, 1);
    },
    getProduct: () => {},
  },
  // extraReducers: (builder) => {
  //   builder
  //     //dang loading lay du lieu tu api
  //     .addCase(productListAsync.pending, (state) => {
  //       state.loading = true; // loading
  //     })
  //     //lay du lieu thanh cong
  //     .addCase(productListAsync.fulfilled, (state, action) => {
  //       state = action.payload; // lay thanh cong du lieu set vao day
  //       state.loading = false;
  //     })
  //     //lay du lieu bi loi
  //     .addCase(productListAsync.rejected, (state) => {
  //       //thong bao cho nguoi dung
  //       state.loading = false;
  //     });
  // },
});

export const { addNewProduct, updateProduct, deleteProduct, getProduct } = productSlice.actions; //lay action ra cho dispatch su dung
export default productSlice.reducer; // cung cap reducer
