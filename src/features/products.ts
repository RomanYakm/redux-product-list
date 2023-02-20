import {
  createSlice, PayloadAction,
} from '@reduxjs/toolkit';
import { ProductState } from '../types/ProductState';

type ProductsState = {
  products: ProductState[],
  loading: boolean;
  error: string,
};

const initialState: ProductsState = {
  products: [],
  loading: false,
  error: '',
};

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    add: (state, action: PayloadAction<ProductState>) => {
      state.products.push(action.payload);
    },
    delete: (state, action: PayloadAction<ProductState>) => {
      state.products = state.products
        .filter(product => product.id !== action.payload.id);
    },
    update: (state, action: PayloadAction<ProductState>) => {
      state.products.find(product => product.id === action.payload.id);
    },
    set: (state, action: PayloadAction<ProductState[]>) => {
      state.products = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
});

export default productsSlice.reducer;
export const { actions } = productsSlice;
