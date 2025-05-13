import React, { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { Skeleton, Stack } from '@mui/material';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../../features/wishlist/wishlistSlice';

const ProductDetail = lazy(() => import('./ProductDetail'));

function Singlepage() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const [isInWishlist, setIsInWishlist] = useState(false);
  const [productDetail, setProductDetail] = useState(null);
  const [productImg, setProductImg] = useState();
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleAddToWishlistInSinglePage = () => {
    if (isInWishlist) {
      dispatch(removeFromWishlist(productDetail.id));
      setIsInWishlist(false);
    } else {
      dispatch(addToWishlist(productDetail.id));
      setIsInWishlist(true);
    }
  };

  const getProductDetails = async (id) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`);
      setProductDetail(res?.data);
      setProductImg(res?.data?.image);
      setIsInWishlist(wishlist.includes(res.data?.id));
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductDetails(id);
  }, [id]);

  if (loading || !productDetail) {
    return (
      <div className='loader-single mt-8 px-4'>
        <Stack spacing={2}>
          <div className="loading-single flex flex-col lg:flex-row justify-center items-center gap-6 lg:gap-20">
            <Skeleton variant="rectangular" width={250} height={250} className='sm:w-[300px] sm:h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px]' />
            <div className="flex flex-col gap-6 w-full lg:w-[500px]">
              <Skeleton variant="rectangular" height={150} />
              <Skeleton variant="rectangular" height={150} />
            </div>
          </div>
        </Stack>
      </div>
    );
  }

  return (
    <Suspense fallback={
      <div className="text-center text-lg font-medium text-[#0B7A74] py-10">
        Loading Product Details...
      </div>
    }>
      <ProductDetail
        productDetail={productDetail}
        productImg={productImg}
        isInWishlist={isInWishlist}
        handleAddToWishlistInSinglePage={handleAddToWishlistInSinglePage}
        isExpanded={isExpanded}
        setIsExpanded={setIsExpanded}
      />
    </Suspense>
  );
}

export default Singlepage;
