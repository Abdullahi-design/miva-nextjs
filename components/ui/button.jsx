"use client";

import { useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const Button = ({ product }) => {
  const { data: session } = useSession()
  const router = useRouter()
  const searchParams = useSearchParams();
  const productId = searchParams.get("affiliateId");
  const [affiliateUserAccount, setAffiliateUserAccount] = useState()
  const [sellerUserAccount, setSellerUserAccount] = useState();
  const paystackProductUrl = product.paystackProductUrl;

  const buyProduct = async () => {
    try {
      if(session?.user.id){
        await router.push(`${paystackProductUrl}`);
      } else {
        alert("Please sign In to continue...");
      }
      // Additional actions or handling after the navigation is complete
    } catch (error) {
      console.error('Error navigating to product URL:', error);
      // Handle the error as needed
    }
  
  }

  const affiliateUserId = productId;
  const sellerUserId = session?.user.id;
  

  // console.log(affiliateUserId);

  // useEffect(() => {
  //   const fetchBankDetails = async (userId, setAccountCallback) => {
  //     const response = await fetch(`/api/payments/create-subAccount/${userId}`);
  //     const data = await response.json();

  //     setAccountCallback(data.paystackResult.data.subaccount_code);
  //     console.log(data, 'the data');
  //   };

  //   if (affiliateUserId) {
  //     fetchBankDetails(affiliateUserId, setAffiliateUserAccount);
  //   }

  //   if (sellerUserId) {
  //     fetchBankDetails(sellerUserId, setSellerUserAccount);
  //   }
  // }, [affiliateUserId, sellerUserId]);
  
  // const buyProduct = async (e) => {
  //   e.preventDefault();
  //   // setIsSubmitting(true);
  //   // alert("Work in progress");
    
  //   try {
  //     const affiliateCommission = product.commission;

  //     // Calculate the seller's commission to ensure the total is 100%
  //     const sellerCommission = (100 - affiliateCommission).toFixed(2);

  //     console.log(product, 'product');
  //     const response = await fetch('/api/payments/create-split', {
  //       method: 'POST',
  //       body: JSON.stringify({
  //         name:`${product.productName} affiliate Percentage Split`, 
  //         type:"percentage",
  //         currency: "NGN", 
  //         subaccounts:[{
  //           subaccount: affiliateUserAccount,
  //           share: parseFloat(affiliateCommission),
  //         },
  //         {
  //           subaccount: sellerUserAccount,
  //           share: parseFloat(sellerCommission),
  //         }],
  //         affiliateUserId,
  //         sellerUserId
  //       })
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       // setPaymentData(data);
  //       console.log(data);
  //     } else {
  //       console.error('Failed to create payment:', response.statusText);
  //     }

  //     // if (response.ok) {
  //     //   router.push("/");
  //     // }
  //     console.log(productId, 'productId');
  //   } catch (error) {
  //     console.log(error);
  //   } finally {
  //     // setIsSubmitting(false);
  //   }


  // };

  return (
    <button  
    type='submit'
    onClick={() => buyProduct()}
    className='w-fit px-4 py-2 text-xl bg-primary-orange hover:bg-white hover:text-gray-700 border border-primary-orange rounded-md font-satoshi text-white'
    >
      {product.cta}
    </button>
  )
}

export default Button