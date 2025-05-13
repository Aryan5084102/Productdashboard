/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from 'react-router-dom';

function paymentSuccess() {
    const navigate = useNavigate()

    return (
        <>
            <div className='w-full h-full flex justify-center items-center flex-col'>
                <img src='https://cashfreelogo.cashfree.com/website/landings/instant-settlements/payment-done.png' alt='Payment Success' />
                <button
                    onClick={() => { navigate('/') }}
                    className='px-3 py-2 my-3 bg-[#0B7A74] text-[#ffff]'>Go To More Shopping
                </button>
            </div>
        </>
    )
}
export default paymentSuccess;