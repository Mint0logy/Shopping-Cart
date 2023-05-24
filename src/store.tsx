import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./features/Products";
import cartReducer from "./features/Cart";

export const store = configureStore({
  reducer: {
    products: productsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
