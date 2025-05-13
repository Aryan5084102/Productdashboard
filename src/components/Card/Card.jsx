/* eslint-disable react/prop-types */
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { IoIosHeartEmpty, IoIosHeart } from "react-icons/io";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice';

function Card({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const wishlist = useSelector(state => state.wishlist.items);
  const isInWishlist = wishlist.includes(product?.id);

  const handleAddToWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(product?.id));
      toast.error("Removed from Wishlist!");
    } else {
      dispatch(addToWishlist(product?.id));
      toast.success("Added to Wishlist!");
    }
  };

  return (
    <>
      <div className='card w-56 h-72 cursor-pointer hover:scale-[1.1] p-2'>
        <div className='object-contain relative'>
          <Link to="#" onClick={handleAddToWishlist} className='absolute right-1 top-1 text-2xl text-[#0B7A74]'>
            {isInWishlist ? (
              <IoIosHeart className='text-red-500' />
            ) : (
              <IoIosHeartEmpty />
            )}
          </Link>
          <img
            className='h-44 w-44'
            src={product?.image}
            alt='Error'
            onClick={() => navigate(`/singlepage/${product.id}`)}
          />
        </div>
        <div
          onClick={() => navigate(`/singlepage/${product?.id}`)}
          className='pt-1 h-24 flex justify-center items-center flex-col'
        >
          <div className='title text-center pl-1 text-[18px] w-44 overflow-hidden whitespace-nowrap'>
            {product?.title}
          </div>
          <p className='rate text-center text-[16px] text-[#0B7A74]'>
            <span className='text-[16px] font-semibold'>Price:</span> ₹{(product?.price * 10).toFixed(0)}
          </p>
          <div className='text-center mt-2'>
            <p className='rate text-center text-[14px]'>
              <span className='text-[15px] font-medium'>Category:</span> {product?.category}
            </p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Card;
