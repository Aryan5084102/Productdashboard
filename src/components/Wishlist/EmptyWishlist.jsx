import React from 'react'
import { useNavigate } from 'react-router-dom'

function EmptyWishlist() {
  const navigate = useNavigate()

  return (
    <div className='w-full flex flex-col gap-6 sm:gap-8 justify-center items-center px-4 py-4'>
      <img
        className='w-72 h-72 sm:w-80 sm:h-80 md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] object-contain'
        src="https://cdn.dribbble.com/users/1010436/screenshots/13921028/dribble_shot_62_4x.jpg"
        alt="EmptyWishlistImg"
      />
      <h3 className='text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-[#0B7A74] text-center'>
        Nothing In The Wishlist
      </h3>
      <button
        onClick={() => navigate('/')}
        className='px-6 py-2 mt-4 bg-[#0B7A74] text-white rounded-lg text-base sm:text-lg hover:bg-[#095b55] transition'
      >
        Go To Shopping
      </button>
    </div>
  )
}

export default EmptyWishlist