import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ totalPage, setCurrentPage, currentPage }) => {
  if (totalPage <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-3 my-10">
      <button
        disabled={currentPage === 1}
        onClick={() => setCurrentPage((prev) => prev - 1)}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
      >
        <ChevronLeft size={18} className="mr-1" />
        Prev
      </button>

      <div className="flex items-center gap-3">
        {Array.from({ length: totalPage }).map((_, i) => {
          const pageNum = i + 1;
          const isActive = currentPage === pageNum;

          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-8 h-8 flex items-center justify-center text-sm font-bold rounded-lg transition-all duration-200 
                ${isActive 
                  ? 'bg-[#0B7A74] text-white shadow-md scale-110' 
                  : 'text-gray-600 hover:bg-gray-100 border border-transparent hover:border-gray-200'
                }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      <button
        disabled={currentPage === totalPage}
        onClick={() => setCurrentPage((prev) => prev + 1)}
        className="flex items-center justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
      >
        Next
        <ChevronRight size={18} className="ml-1" />
      </button>
    </div>
  );
};

export default Pagination;