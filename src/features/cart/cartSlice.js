import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
      state.count++;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(id => id !== action.payload);
      if (state.count > 0) state.count--;
    },
    setCartItems: (state, action) => {
      state.items = action.payload;
      state.count = action.payload.length;
    },
    setWholeProduct: (state, action) => {
      state.wholeProduct = action.payload;
    },
  }
});

export const { addToCart, removeFromCart, setCartItems, setWholeProduct } = cartSlice.actions;
export default cartSlice.reducer;
