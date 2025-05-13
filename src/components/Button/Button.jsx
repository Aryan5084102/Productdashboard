/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../../features/cart/cartSlice';
import { Link, useNavigate } from 'react-router-dom';

function Button({ id: productId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector(state => state.cart.items);
  const isInCart = cartItems.includes(productId);

  const [addToCartText, setAddToCartText] = useState(() => {
    return isInCart ? 'Go to Cart' : 'Add to Cart';
  });

  const handleAddToCartClick = () => {
    if (addToCartText === 'Add to Cart') {
      dispatch(addToCart(productId));
      setAddToCartText('Go to Cart');
    } else {
      navigate('/cart');
    }
  };

  const handleBuyNowClick = () => {
    if (!isInCart) {
      dispatch(addToCart(productId));
    }
    navigate('/cart');
  };

  return (
    <>
      <button
        onClick={handleAddToCartClick}
        className={`inline-block px-4 py-2 mr-5 text-[16px] font-semibold cursor-pointer text-[#fff] hover:scale-[1.02] ${
          addToCartText === 'Go to Cart' ? 'bg-[#e8db28]' : 'bg-[#0B7A74]'
        }`}
      >
        {addToCartText}
      </button>
      <Link
        to="#"
        onClick={handleBuyNowClick}
        className="inline-block px-4 py-2 text-[16px] font-semibold cursor-pointer text-[#fff] hover:scale-[1.02] bg-[#e84528]"
      >
        Buy Now
      </Link>
    </>
  );
}

export default Button;
