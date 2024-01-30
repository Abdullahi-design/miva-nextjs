"use client";

import Loader from '@components/Loader';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { handleDownload } from '@utils/downloadProduct';
import { sendProductToEmail } from '@app/api/notification/sendProductToEmail';

const page = () => {
  const {data: session} = useSession();
  const searchParams = useSearchParams();
  const productReference = searchParams.get("reference");
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
        const response = await fetch(`/api/product/${productId}`);
        const data = await response.json();

        setProduct(data);
        // sendProductToEmail(session, data)
        console.log(data, 'data');
    };

    if (productId) fetchProducts();
  }, [productId]); 
  
  return (
    <div className='text-center my-5'>
      {/* <div>Reference Id: {productReference}</div> */}
      <p className='text-green-700 md:text-5xl text-3xl font-bold'>Hudsuller Says: </p>
      <p className='text-green-700 md:text-5xl text-3xl font-bold my-4'>Thank You 😊</p>
      {product ? (
        <div className="flex flex-col items-center space-y-4">
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