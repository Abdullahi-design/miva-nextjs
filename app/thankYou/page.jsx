"use client";

import Loader from '@components/Loader';
// import { sendProductToEmail } from '@utils/emailDownload';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import JSZip from 'jszip';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
  const searchParams = useSearchParams();
  const productReference = searchParams.get("reference");
  const productId = searchParams.get("productId");
  const [product, setProduct] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
        const response = await fetch(`/api/product/${productId}`);
        const data = await response.json();

        setProduct(data);
        console.log(data, 'data');
    };

    if (productId) fetchProducts();
  }, [productId]);

  const handleDownload = async () => {
    if (product && product.digitalProduct) {
      const zip = new JSZip();
      const imgBlob = await fetch(product.digitalProduct).then((res) => res.blob());

      // Add the image blob to the zip file
      zip.file('digital_product.zip', imgBlob);

      // Generate the zip file
      const zipBlob = await zip.generateAsync({ type: 'blob' });

      // Create a link element
      const link = document.createElement('a');
      link.href = URL.createObjectURL(zipBlob);
      link.download = 'digital_product.zip';

      // Append the link to the body
      document.body.appendChild(link);

      // Trigger a click on the link to start the download
      link.click();

      // Remove the link from the body
      document.body.removeChild(link);
    }
  };
  
  
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
            onClick={handleDownload}
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