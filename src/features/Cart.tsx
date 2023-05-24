import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export interface ProductInCart {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
  discountPercentage: number;
  discountedPrice: number;
}

export interface Cart {
  id: number;
  products: ProductInCart[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

const cartState: Cart = {
  id: 1,
  products: [],
  total: 0,
  discountedTotal: 0,
  userId: 1,
  totalProducts: 0,
  totalQuantity: 0,
};

export const addCartToDJAsync = createAsyncThunk(
  "cart/addCartToDJ",
  async (cart: Cart) => {
    try {
      const response = await fetch("https://dummyjson.com/carts/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cart),
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.log(error.message);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState: cartState,
  reducers: {
    addToCart: (state, action: PayloadAction<ProductInCart>) => {
      const product = action.payload;
      const existingProduct = state.products.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity += product.quantity;
        existingProduct.total += product.total;
      } else {
        state.products.push(product);
      }
      state.total += product.total;
      state.discountedTotal += product.discountedPrice * product.quantity;
      state.totalProducts += 1;
      state.totalQuantity += product.quantity;
    },
    increaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        product.quantity += 1;
        product.total = product.price * product.quantity;
        state.total += product.price;
        state.discountedTotal += product.discountedPrice;
        state.totalQuantity += 1;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const product = state.products.find((p) => p.id === productId);
      if (product) {
        if (product.quantity === 1) {
          cartSlice.caseReducers.removeProduct(state, action);
        } else {
          product.quantity -= 1;
          product.total = product.price * product.quantity;
          state.total -= product.price;
          state.discountedTotal -= product.discountedPrice;
          state.totalQuantity -= 1;
        }
      }
    },
    removeProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const productIndex = state.products.findIndex((p) => p.id === productId);
      if (productIndex !== -1) {
        const product = state.products[productIndex];
        state.products.splice(productIndex, 1);
        state.total -= product.total;
        state.discountedTotal -= product.discountedPrice * product.quantity;
        state.totalProducts -= 1;
        state.totalQuantity -= product.quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addCartToDJAsync.fulfilled, (state, action) => {
      console.log("Cart data send successfully");
    });
    builder.addCase(addCartToDJAsync.rejected, (state, action) => {
      console.error("There are some problems sending cart data:");
    });
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, removeProduct } =
  cartSlice.actions;
export default cartSlice.reducer;
