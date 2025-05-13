import React from 'react';
import { useNavigate } from 'react-router-dom';

function EmptyCart() {
  const navigate = useNavigate();

  return (
    <div className='w-full flex flex-col justify-center items-center gap-6 sm:gap-8 px-4 py-8'>
      <img
        className='w-72 h-72 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] object-contain'
        src="https://img.freepik.com/premium-vector/shopping-cart-with-cross-mark-wireless-paymant-icon-shopping-bag-failure-paymant-sign-online-shopping-vector_662353-912.jpg"
        alt="EmptyCartImg"
      />
      <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B7A74] text-center'>
        Nothing In The Cart
      </h3>
      <button
        onClick={() => navigate('/')}
        className='px-6 py-2 mt-4 bg-[#0B7A74] text-white rounded-lg text-base sm:text-lg hover:bg-[#095b55] transition'
      >
        Go To Shopping
      </button>
    </div>
  );
}

export default EmptyCart;