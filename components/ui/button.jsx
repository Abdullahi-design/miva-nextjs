"use client";

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Button = ({ product }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");
  const [affiliateUserAccount, setAffiliateUserAccount] = useState()
  const [sellerUserAccount, setSellerUserAccount] = useState();
  const paystackProductUrl = product.paystackProductUrl;

  
  const buyProduct = async (product) => {
    try {
      const productId = await product._id;
      if (productId) {
        console.log(productId);
        // Navigate to the Paystack product URL
        await router.push(`${paystackProductUrl}`);
        
        // Fetch the Paystack response after navigation
        const response = await fetch(`${paystackProductUrl}`);
        const paystackResponse = await response.json();
        
        // Log the Paystack response
        console.log('Paystack Response:', paystackResponse);
      } else {
        alert("Please sign in to continue...");
      }
    } catch (error) {
      console.error('Error navigating to product URL:', error);
      // Handle the error as needed
    }
  };

  const affiliateUserId = productId;
  const sellerUserId = session?.user.id;
  
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