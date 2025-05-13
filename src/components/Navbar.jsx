import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { IoIosHeartEmpty } from 'react-icons/io';
import Badge from '@mui/material/Badge';
import { useSelector } from 'react-redux';

function Navbar() {

  const cartCount = useSelector((state) => state.cart.count);
  const wishlistCount = useSelector((state) => state.wishlist.count);

  return (
    <div className='flex justify-between items-center px-4 py-3 sticky top-0 left-0 z-10 bg-[#D7E4C0]'>
      <Link to="/" className='flex items-center'>
        <div className='font-extrabold text-[#0B7A74] cursor-pointer text-2xl md:text-2xl sm:text-xl'>
          Dashboard
        </div>
      </Link>

      <div className='flex items-center space-x-4'>
        <Link to='/wishlist' className='flex items-center text-xl hover:text-[#0B7A74]'>
          <Badge badgeContent={wishlistCount} color="warning">
            <IoIosHeartEmpty size={22} />
          </Badge>
          <span className='ml-1 font-bold hidden sm:inline'>Wishlist</span>
        </Link>

        <Link to='/cart' className='flex items-center text-xl hover:text-[#0B7A74]'>
          <Badge badgeContent={cartCount} color="warning">
            <FaShoppingCart />
          </Badge>
          <span className='ml-1 font-bold hidden sm:inline'>Cart</span>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;