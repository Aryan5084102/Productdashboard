import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: [],
    count: 0,
  },
  reducers: {
    addToWishlist: (state, action) => {
      state.items.push(action.payload);
      state.count++;
    },
    removeFromWishlist: (state, action) => {
      state.items = state.items.filter(id => id !== action.payload);
      if (state.count > 0) state.count--;
    },
    setWishlistItems: (state, action) => {
      state.items = action.payload;
      state.count = action.payload.length;
    },
  }
});

export const { addToWishlist, removeFromWishlist, setWishlistItems} = wishlistSlice.actions;
export default wishlistSlice.reducer;