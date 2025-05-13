/* eslint-disable react/prop-types */
import React from 'react';
import SellIcon from '@mui/icons-material/Sell';
import { Rating } from '@mui/material';
import { IoIosHeart, IoIosHeartEmpty } from 'react-icons/io';
import Button from '../Button/Button';

const ProductDetail = ({
  productDetail,
  productImg,
  isInWishlist,
  handleAddToWishlistInSinglePage,
  isExpanded,
  setIsExpanded,
}) => {
  return (
    <div className='flex flex-col lg:flex-row w-full my-3' key={productDetail?.id}>
      <div className='flex justify-center w-full lg:w-1/2 mt-6 relative'>
        <img
          className='object-contain cursor-pointer rounded-md w-[300px] h-[300px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-[500px] lg:h-[500px]'
          src={productImg}
          alt='error'
        />
        <button
          onClick={handleAddToWishlistInSinglePage}
          className='absolute top-4 right-4 text-3xl text-[#0B7A74]'
        >
          {isInWishlist ? (
            <IoIosHeart className='text-red-500' />
          ) : (
            <IoIosHeartEmpty />
          )}
        </button>
      </div>

      <div className='w-full lg:w-1/2 lg:pl-10 mt-6 lg:mt-0 px-4'>
        <h1 className='my-3 text-2xl font-semibold text-black'>{productDetail?.title}</h1>
        
        <div className='text-sm'>
          <p className={`${isExpanded ? '' : 'line-clamp-2'} overflow-hidden`}>
            {productDetail?.description}
          </p>
          {productDetail?.description.length > 100 && (
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className='text-[#0B7A74] mt-1 focus:outline-none'
            >
              {isExpanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>

        <div className='mb-2 mt-2 flex items-center'>
          <span className='title-font text-xl font-bold text-[#0B7A74] mr-3'>
            Price : ₹{(productDetail?.price * 10).toFixed(0)}
          </span>
        </div>

        <div className='mb-3 mt-2 flex items-center'>
          <Rating
            name='read-only'
            defaultValue={productDetail?.rating?.rate}
            precision={0.5}
            readOnly
          />
          <p className='rate text-center text-gray-500 text-[15px] ml-2'>
            ({productDetail?.rating?.rate} Ratings and {productDetail?.rating?.count} Reviews)
          </p>
        </div>

        <div className='mt-4 mr-3 text-justify'>
          <h3 className='my-3 text-[18px] font-semibold'>Available Offers:</h3>
          <div className='space-y-2'>
            <div className='flex items-center'>
              <SellIcon className='text-[#0B7A74]' />
              <b className='ml-2'>Partner Offer: </b>Purchase now & get a surprise cashback coupon in 2025.
            </div>
            <div className='flex items-center'>
              <SellIcon className='text-[#0B7A74]' />
              <b className='ml-2'>Bank Offer: </b>Flat ₹100 Instant Cashback on Paytm Wallet. Min Order ₹1000. Valid once per User.
            </div>
            <div className='flex items-center'>
              <SellIcon className='text-[#0B7A74]' />
              <b className='ml-2'>Bank Offer: </b>5% Cashback on Axis Bank Card.
            </div>
          </div>
        </div>

        <div className='mt-5'>
          <Button id={productDetail?.id} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
