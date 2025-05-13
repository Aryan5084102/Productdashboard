import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'search',
  initialState: {
    searchTerm: '',
    filteredData: [],
    allProducts: []
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setFilteredData: (state, action) => {
      state.filteredData = action.payload;
    },
    setAllProducts: (state, action) => {
      state.allProducts = action.payload;
    }
  }
});

export const { setSearchTerm, setFilteredData, setAllProducts } = searchSlice.actions;
export default searchSlice.reducer;