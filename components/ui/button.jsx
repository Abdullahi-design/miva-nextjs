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
    try {
      const customerEmail = session?.user.email;
      const price = product.price;
      // const productId = product._id;
      const sellerId = product.creator._id;
      const commission = product.commission;
      console.log(product);

      const productId = await product._id;
      if (productId) {
        console.log(productId, affiliateId);
        
        // Fetch the Paystack response after navigation
        const response = await fetch(`/api/payments/create-payment`, {
          method: "POST",
          body: JSON.stringify({
            customerEmail,
            price,
            productId,
            affiliateId,
            sellerId,
            commission,
          }),
          headers: { "Content-Type": "application/json" }, 
        });
        const paystackResponse = await response.json();
        
        // Log the Paystack response
        console.log('Paystack Response:', paystackResponse);

        if (paystackResponse.status == true) {
          await router.push(`${paystackResponse.data.authorization_url}`)
        }
      } else {
        alert("Please sign in to continue...");
      }
    } catch (error) {
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