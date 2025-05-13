import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card/Card';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { FaFilter } from 'react-icons/fa';
import CardSkeleton from './Card/CardSkeleton';
import { FaSearch } from 'react-icons/fa';
import { setSearchTerm } from '../features/search/searchSlice';


function AllProduct() {
  const filteredData = useSelector((state) => state.search.filteredData);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const uniqueCategories = [...new Set(filteredData.map(item => item.category))];
      setCategories(uniqueCategories);
      setFilteredProducts(filteredData);
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [filteredData]);

  const searchProductItem = (val) => {
    dispatch(setSearchTerm(val));
  };

  useEffect(() => {
    if (selectedCategory === '') {
      setFilteredProducts(filteredData);
    } else {
      setFilteredProducts(filteredData.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, filteredData]);


  return (
    <>
      <ToastContainer
        limit={3}
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Bounce}
      />
      <div className="w-full px-6">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6 mt-4">

          <div className="flex items-center w-full md:w-1/3 bg-gray-100 h-10 rounded-lg">
            <div className="mx-3 text-[#0B7A74]">
              <FaSearch />
            </div>
            <input
              type="text"
              placeholder="Search products by name"
              className="outline-none px-3 text-base bg-gray-100 w-full"
              onChange={(e) => searchProductItem(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto">
            <FaFilter className="text-lg text-gray-700" />
            <span className="text-gray-700 font-medium whitespace-nowrap">Filter:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-1 outline-none w-full md:w-auto"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="card-container mt-4 flex flex-wrap justify-center gap-5">
          {loading ? (
            Array.from({ length: 20 }).map((_, i) => <CardSkeleton key={i} />)
          ) : (
            filteredProducts.map((cardItem) => (
              <div key={cardItem.id} className="flex items-center">
                <Card product={cardItem} />
              </div>
            ))
          )}
        </div>
      </div>

    </>
  );
}

export default AllProduct;