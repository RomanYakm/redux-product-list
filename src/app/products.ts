// import { createSlice, Dispatch } from "@reduxjs/toolkit";

// const productsSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action: PayloadAction<boolean>) => {
//       state.error = action.payload;
//     },
//     set: (state, action: PayloadAction<string[]>) => {
//       state.products = action.payload;
//     },
//   }
// });

// export default productsSlice.reducer;
// export const { set, add, take, clear, setLoading, setError } = productsSlice.actions;

// export const init = () => {
//   return (dispatch: Dispatch) => {
//     dispatch(setLoading(true));

//     fetchProducts()
//       .then(productsFromServer => {
//         dispatch(set(productsFromServer));
//       })
//       .catch(() => {
//         dispatch(setError('Something went wrong'));
//       })
//       .finally(() => {
//         dispatch(setLoading(false));
//       })
//   }
// };

export {};
