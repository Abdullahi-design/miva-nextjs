"use client";

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Button = ({ product }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams();
  const affiliateId = searchParams.get("affiliateId");

  
  const buyProduct = async (product) => {
    try{
      console.log('hi');
    }catch (error) {
      console.error('Error navigating to product URL:', error);
      // Handle the error as needed
    }
  };

  // const affiliateUserId = productId;
  // const sellerUserId = session?.user.id;
  
  return (
    <button  
    type='submit'
    onClick={() => buyProduct(product)}
    className='w-fit px-4 py-2 text-xl bg-primary-orange hover:bg-white hover:text-gray-700 border border-primary-orange rounded-md font-satoshi text-white'
    >
      {product.cta}
    </button>
  )
}

export default Button