import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card/Card';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';
import { FaFilter } from 'react-icons/fa';
import CardSkeleton from './Card/CardSkeleton';
import { FaSearch } from 'react-icons/fa';
import { setSearchTerm } from '../features/search/searchSlice';
import Pagination from './Pagination';
import { Check, ChevronDown } from 'lucide-react';

function AllProduct() {
  const filteredData = useSelector((state) => state.search.filteredData);
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

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
    setCurrentPage(1);
  };

  useEffect(() => {
    setCurrentPage(1);
    if (selectedCategory === '') {
      setFilteredProducts(filteredData);
    } else {
      setFilteredProducts(filteredData.filter(product => product.category === selectedCategory));
    }
  }, [selectedCategory, filteredData]);

  useEffect(() => {
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };
  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);

  const ITEMPERPAGE = 6;
  const indexOfLastItem = currentPage * ITEMPERPAGE;
  const indexOfFirstItem = indexOfLastItem - ITEMPERPAGE;
  
  const currentItem = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPage = Math.ceil(filteredProducts.length / ITEMPERPAGE);

  return (
    <>
      <ToastContainer
        limit={3}
        position="top-right"
        autoClose={2000}
        hideProgressBar={true}
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

            <div className="relative inline-block w-full md:w-64" ref={dropdownRef}>
  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1 mb-1 block">
    Category Filter
  </label>
  
  <button
    onClick={() => setIsOpen(!isOpen)}
    className={`w-full flex items-center justify-between px-4 py-2.5 bg-white border-2 transition-all duration-200 rounded-xl shadow-sm ${
      isOpen ? 'border-[#0B7A74] ring-4 ring-[#0B7A74]/10' : 'border-gray-100 hover:border-gray-300'
    }`}
  >
    <span className={`text-sm font-semibold ${selectedCategory ? 'text-gray-800' : 'text-gray-400'}`}>
      {selectedCategory || "All Categories"}
    </span>
    <ChevronDown
      size={18} 
      className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180 text-[#0B7A74]' : ''}`} 
    />
  </button>

  {/* Dropdown Menu */}
  {isOpen && (
    <ul className="absolute z-[110] w-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl overflow-hidden animate-in fade-in zoom-in duration-200 origin-top">
      <li
        onClick={() => { setSelectedCategory(''); setIsOpen(false); }}
        className="flex items-center justify-between px-4 py-3 text-sm cursor-pointer hover:bg-gray-50 transition-colors border-b border-gray-50"
      >
        <span className={!selectedCategory ? "text-[#0B7A74] font-bold" : "text-gray-600"}>All Categories</span>
        {!selectedCategory && <Check size={16} className="text-[#0B7A74]" />}
      </li>
      
      {categories.map((cat) => (
        <li
          key={cat}
          onClick={() => { setSelectedCategory(cat); setIsOpen(false); }}
          className="flex items-center justify-between px-4 py-3 text-sm cursor-pointer hover:bg-[#0B7A74]/5 transition-colors group"
        >
          <span className={`${selectedCategory === cat ? "text-[#0B7A74] font-bold" : "text-gray-600 group-hover:text-gray-900"}`}>
            {cat}
          </span>
          {selectedCategory === cat && <Check size={16} className="text-[#0B7A74]" />}
        </li>
      ))}
    </ul>
  )}
</div>
        </div>

        <div className="card-container mt-4 flex flex-wrap justify-center gap-5 min-h-[400px]">
          {loading ? (
            Array.from({ length: 4 }).map((_, i) => <CardSkeleton key={i} />)
          ) : currentItem.length > 0 ? (
            currentItem.map((cardItem) => (
              <div key={cardItem.id} className="flex items-center">
                <Card product={cardItem} />
              </div>
            ))
          ) : (
            <div className="text-gray-500 mt-10 font-medium">No products found.</div>
          )}
        </div>

        {filteredProducts.length > ITEMPERPAGE && (
          <div className="mt-8 mb-8">
            <Pagination
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
              totalPage={totalPage}
            />
          </div>
        )}
      </div>
    </>
  );
}

export default AllProduct;