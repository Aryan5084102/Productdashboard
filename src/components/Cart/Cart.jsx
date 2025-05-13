import React, { useEffect, useState } from 'react';
import { Rating } from '@mui/material';
import Modal from './Modal';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EmptyCart from './EmptyCart';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  removeFromCart,
  setCartItems,
  setWholeProduct
} from '../../features/cart/cartSlice';
import axios from 'axios';

function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items);
  const wholeProduct = useSelector((state) => state.cart.wholeProduct);
  const navigate = useNavigate();

  const [filteredData, setFilteredData] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('https://fakestoreapi.com/products');
        dispatch(setWholeProduct(res.data));
      } catch (error) {
        console.error('Error fetching products', error);
      }
    };

    if (!wholeProduct || wholeProduct.length === 0) {
      fetchProducts();
    }
  }, [wholeProduct, dispatch]);

  useEffect(() => {
    filterData();
  }, [cart, wholeProduct]);

  const filterData = () => {
    if (Array.isArray(wholeProduct) && wholeProduct.length && Array.isArray(cart)) {
      const filter = wholeProduct.filter((item) => cart.includes(item.id));
      setFilteredData(filter);

      const newQuantities = {};
      filter.forEach((item) => {
        newQuantities[item.id] = quantities[item.id] || 1;
      });
      setQuantities(newQuantities);
    } else {
      setFilteredData([]);
    }
  };

  const IncreaseItem = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] + 1
    }));
  };

  const DecreaseItem = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 1 ? prev[id] - 1 : 1
    }));
  };

  const removeFromCartButtonHandler = (id) => {
    dispatch(removeFromCart(id));
    dispatch(setCartItems(cart.filter((itemId) => itemId !== id)));
  };

  useEffect(() => {
    let temp = 0;
    filteredData.forEach((item) => {
      const qty = quantities[item.id] || 1;
      temp += item.price * qty;
    });
    setTotalPrice(temp);
  }, [filteredData, quantities]);

  const overallCost = totalPrice * 10;

  const buyNow = async () => {
    if (!name || !address || !pincode || !phoneNumber) {
      return toast.error('All fields are required', {
        position: 'top-center',
        autoClose: 1000,
        theme: 'colored'
      });
    }
  
    const options = {
      key: 'rzp_test_DHRXCwOsSU6EQ7',
      key_secret: 'TzoSK7XqA91akBb5D98L6CaA',
      amount: parseInt((overallCost * 100).toFixed(0)),
      currency: 'INR',
      name: 'Product Dashboard',
      description: 'For testing purpose',
      image: './favicon/favicon.png',
      prefill: {
        name: 'Aryan Verma',
        email: 'aryanji@gmail.com',
        contact: '8756119548'
      },
      handler: function (response) {
        toast.success('Payment Successful');
  
        dispatch(setCartItems([]));
  
        setQuantities({});
        setFilteredData([]);
  
        navigate('/paymentsuccess');
      },
      theme: {
        color: '#3399cc'
      }
    };
  
    const pay = new window.Razorpay(options);
    pay.open();
  };
  

  if (!filteredData || filteredData.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="mx-auto max-w-7xl px-2 lg:px-0">
      <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          My Cart
        </h1>
        <form className="mt-4 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <section className="rounded-lg lg:col-span-8">
            <ul className="divide-y">
              {filteredData.map((product) => (
                <div key={product.id} className="mb-6 border rounded-md p-4 bg-white shadow-sm">
                  <li className="flex py-6 sm:py-6">
                    <div className="flex-shrink-0">
                      <img
                        src={product?.image}
                        alt={product?.title}
                        className="sm:h-38 px-2 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                      />
                    </div>
                    <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                      <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                        <div>
                          <h3 className="text-xl">{product?.title}</h3>
                          <div className="mt-1 flex text-sm">
                            <Rating
                              name="read-only"
                              defaultValue={product?.rating?.rate}
                              precision={0.5}
                              readOnly
                            />
                          </div>
                          <div className="mt-1 flex items-end">
                            <p className="text-2xl font-medium text-[#0B7A74]">
                              ₹ {(product.price * 10 * (quantities[product.id] || 1)).toFixed(0)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                  <div className="mb-2 flex">
                    <div className="min-w-24 flex">
                      <button onClick={() => DecreaseItem(product?.id)} type="button" className="h-7 w-7">-</button>
                      <input
                        type="text"
                        className="mx-1 h-7 w-9 rounded-md border text-center"
                        value={quantities[product?.id] || 1}
                        readOnly
                      />
                      <button onClick={() => IncreaseItem(product?.id)} type="button" className="h-7 w-7">+</button>
                    </div>
                    <div className="ml-6 flex text-sm">
                      <button type="button" onClick={() => removeFromCartButtonHandler(product?.id)} className="text-xs font-medium text-red-500">
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </section>

          <section className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0">
            <h2 className="border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900">
              Price Details
            </h2>
            <div>
              <dl className="space-y-1 px-2 py-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-800">Total Price</dt>
                  <dd className="text-sm font-medium text-gray-900">₹ {totalPrice * 10}</dd>
                </div>
                <div className="flex items-center justify-between border-y border-dashed py-4">
                  <dt className="text-base font-medium text-gray-900">Total Amount</dt>
                  <dd className="text-base font-medium text-gray-900">₹ {overallCost}</dd>
                </div>
              </dl>
            </div>
            <Modal
              name={name}
              address={address}
              pincode={pincode}
              phoneNumber={phoneNumber}
              setName={setName}
              setAddress={setAddress}
              setPincode={setPincode}
              setPhoneNumber={setPhoneNumber}
              buyNow={buyNow}
            />
          </section>
        </form>
      </div>
    </div>
  );
}

export default Cart;