import React from 'react';

const CardSkeleton = () => {
  return (
    <div className="w-56 h-72 bg-gray-200 animate-pulse rounded-md p-4 flex flex-col gap-4">
      <div className="h-36 bg-gray-300 rounded"></div>
      <div className="h-4 bg-gray-300  rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="h-8 bg-gray-300 rounded w-full mt-auto"></div>
    </div>
  );
};

export default CardSkeleton;
