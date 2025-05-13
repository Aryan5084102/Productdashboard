import React, { useEffect, useState } from 'react';
import { Trash } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import EmptyWishlist from './EmptyWishlist';
import { Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  removeFromWishlist,
  setWishlistItems
} from '../../features/wishlist/wishlistSlice';
import { setWholeProduct } from '../../features/cart/cartSlice';

function Wishlist() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const wholeProduct = useSelector((state) => state.cart.wholeProduct || []);
  const wishlist = useSelector((state) => state.wishlist.items || []);

  const [filterWishlistItem, setFilterWishlistItem] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        dispatch(setWholeProduct(res.data));
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    if (!wholeProduct.length) {
      fetchProducts();
    }
  }, [dispatch, wholeProduct.length]);

  useEffect(() => {
    if (wholeProduct.length && wishlist.length) {
      const filtered = wholeProduct.filter((item) =>
        wishlist.includes(item.id)
      );
      setFilterWishlistItem(filtered);
    } else {
      setFilterWishlistItem([]);
    }
  }, [wishlist, wholeProduct]);

  const handleRemoveFromWishlist = (wishId) => {
    dispatch(removeFromWishlist(wishId));
    dispatch(setWishlistItems(wishlist.filter((itemId) => itemId !== wishId)));
  };

  return filterWishlistItem.length ? (
    <div className="w-full flex justify-center flex-col items-center py-5">
      <h1 className="text-3xl mb-5 font-bold tracking-tight text-gray-900 sm:text-4xl">
        My Wishlist
      </h1>
      <section
        aria-labelledby="cart-heading"
        className="w-3/4 rounded-lg lg:col-span-8"
      >
        <ul role="list" className="divide-y">
          {filterWishlistItem.map((items) => (
            <div
              key={items.id}
              className="mb-6 border rounded-md p-4 bg-white shadow-sm"
            >
              <li className="flex py-6 sm:py-6">
                <div
                  className="flex cursor-pointer"
                  onClick={() => navigate(`/singlepage/${items?.id}`)}
                >
                  <div className="flex-shrink-0">
                    <img
                      src={items?.image}
                      alt={items?.title}
                      className="sm:h-38 px-2 sm:w-38 h-32 w-32 rounded-md object-contain object-center"
                    />
                  </div>
                  <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                    <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                      <div>
                        <h3 className="text-xl">{items?.title}</h3>
                        <div className="mt-1 flex text-sm">
                          <Rating
                            name="read-only"
                            defaultValue={items?.rating?.rate}
                            precision={0.5}
                            readOnly
                          />
                        </div>
                        <div className="mt-1 flex items-end">
                          <p className="text-2xl font-medium text-[#0B7A74]">
                            &#8377;{items.price * 10}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <div className="mb-2 flex">
                <div className="ml-6 flex text-sm">
                  <button
                    type="button"
                    onClick={() => handleRemoveFromWishlist(items.id)}
                    className="flex items-center space-x-1 px-2 py-1 pl-0"
                  >
                    <Trash size={18} className="text-red-500" />
                    <span className="text-[15px] font-medium text-red-500">
                      Remove from Wishlist
                    </span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </section>
    </div>
  ) : (
    <EmptyWishlist />
  );
}

export default Wishlist;