import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState } from '../types/ProductState';

const initialState: ProductState[] = [];

const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    add: (products, action: PayloadAction<ProductState>) => {
      products.push(action.payload);
    },
    delete: (products, action: PayloadAction<ProductState>) => {
      return products.filter(product => product.id !== action.payload.id);
    },
  },
});

export default productsSlice.reducer;
export const { actions } = productsSlice;
