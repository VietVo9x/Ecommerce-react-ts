import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import ProductReducer from '../slice/ProductStore';
import AuthReducer from '../slice/AuthSlice';

export const store = configureStore({
  reducer: {
    products: ProductReducer,
    auth: AuthReducer,
  },
});

// export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
