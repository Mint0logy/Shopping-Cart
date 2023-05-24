import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductProps {
  product: Product;
}

interface ProductsState {
  status: string;
  value: Product[];
  error: string | null;
}

const initialState: ProductsState = {
  status: "idle",
  value: [],
  error: null,
};

export const fetchProductsAsync = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await fetch("http://dummyjson.com/products");
      const data = await response.json();
      return data.products;
    } catch (error: any) {
      console.log("Error while fetching data from Dummyjson.com: ", error);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProductsAsync.pending, (state, action) => {
      state.status = "loading";
    });
    builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {
      state.status = "succeeded";
      state.value = action.payload;
    });
    builder.addCase(fetchProductsAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message as string;
    });
  },
});

export default productsSlice.reducer;
