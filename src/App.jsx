import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './components/Navbar';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import {
  setAllProducts,
  setFilteredData,
} from './features/search/searchSlice';

function App() {
  const dispatch = useDispatch();
  const { searchTerm, allProducts } = useSelector((state) => state.search);

  const fetchAllProducts = async () => {
    try {
      const response = await axios.get('https://fakestoreapi.com/products');
      dispatch(setAllProducts(response.data));
      dispatch(setFilteredData(response.data.slice(0, 30)));
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

  const filterDataBasedOnSearch = () => {
    const filtered = allProducts.filter((item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    dispatch(setFilteredData(filtered));
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (searchTerm.length !== 0) {
      filterDataBasedOnSearch();
    } else {
      dispatch(setFilteredData(allProducts.slice(0, 30)));
    }
  }, [searchTerm]);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}

export default App;