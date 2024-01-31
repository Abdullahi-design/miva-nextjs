"use client";

import Loader from '@components/Loader';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { handleDownload } from '@utils/downloadProduct';
import { sendProductToEmail } from '@app/api/notification/sendProductToEmail';

const page = () => {
  const searchParams = useSearchParams();
  const transactionReference = searchParams.get("trxref");
  const [product, setProduct] = useState();
  const secretKey = 'sk_test_64b151dd8f9b5a6045cbe8bb03f0d39b3e201d82';

  useEffect(() => {
    const fetchProducts = async () => {
  
      const options = {
        hostname: 'api.paystack.co',
        port: 443,
        path: `/transaction/verify/${transactionReference}`,
        method: 'GET',
        headers: {
          Authorization: `Bearer ${secretKey}`
        }
      };

      const paystackResponse = await fetch(`https://${options.hostname}${options.path}`, options);
      const data = await paystackResponse.json();

      if (data.status == true) {
        const getProduct = await fetch(`/api/product/${data.data.metadata.productId}`);
        const getProductData = await getProduct.json();
        
        setProduct(getProductData);
        
        // await fetch(`/api/payments/saveVerifiedTransaction`, {
        //   method: "POST",
        //   body: JSON.stringify({
        //     paystackResult: data
        //   }),
        // })
        // // sendProductToEmail(session, getProductData)
        console.log(getProductData, 'getProductData');
      }
    };

    fetchProducts();
  }, [transactionReference]); 
  
  return (
    <div className='text-center my-5'>
      {/* <div>Reference Id: {transactionReference}</div> */}
      <p className='text-green-700 md:text-5xl text-3xl font-bold'>Hudsuller Says: </p>
      <p className='text-green-700 md:text-5xl text-3xl font-bold my-4'>Thank You 😊</p>
      {product ? (
        <div className="flex flex-col items-center space-y-4">
          <p className='text-xl font-bold'>A copy of this product was sent to your email</p>
          <div className="rounded-lg overflow-hidden w-[10rem] h-[10rem] relative">
            <Image
              src={product.coverImage}
              alt={product.productName}
              fill
            />
          </div>
          <div className="text-center">
            <h2 className="text-2xl font-bold">{product.productName}</h2>
            <button
              onClick={() => handleDownload(product)}
              className='w-fit px-6 py-3 md:text-xl text-md bg-primary-orange hover:bg-white hover:text-gray-700 border border-primary-orange rounded-md font-satoshi text-white transition-all duration-300'
            >
              Download Product
            </button>
          </div>
      </div>
      
      ):(<Loader />)}
    </div>
  )
}

export default page