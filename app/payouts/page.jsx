"use client"
import PayoutInput from '@components/PayoutInput'
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'

const page = () => {
  const { data: session } = useSession();
  const [banks, setBanks] = useState([]);
  const [submitting, setIsSubmitting] = useState(false);
  const [bankDetails, setBankDetails] = useState({ 
    bankName: "",
    accountNumber: "",
    aliseName: "",
    bankCode: "",
    percentageCharges: (0.12 * 100),
  });

  useEffect(() => {
    const fetchbankList = async () => {
      const response = await fetch(`/api/payments/listBanks`);
      const responseData = await response.json();
      
      setBanks(responseData.data);
      // console.log(listBanks, 'listBanks');
    };
    
    if (session?.user.id) fetchbankList();
  }, [session?.user.id]);

  const createSubAccount =  async(e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch("/api/payments/create-subAccount", {
        method: "POST",
        body: JSON.stringify({
          bankName: bankDetails.bankName,
          bankCode: bankDetails.bankCode,
          accountNumber: bankDetails.accountNumber,
          percentageCharges: bankDetails.percentageCharges,
          aliseName: bankDetails.aliseName,
          userId: session?.user.id,
        }),
      });

      // if (response.ok) {
      //   router.push("/");
      // }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

      
  // const paymentMethods = [
  //   {id: 1, name: "Paystack", href: "https://dashboard.paystack.com/#/login?next=pages.one", transactionFee: 0.025},
  //   {id: 2, name: "Monnie Point", href: "#", transactionFee: 0},
  // ]
  return (
    <section className='block'>
      <div className='md:flex block gap-3 md:space-y-0 space-y-3'>
        {/* {paymentMethods.map(paymentMethod =>
          <PayoutCard 
            key={paymentMethod.id}
            paymentMethod={paymentMethod} 
          />
        )} */}
        <PayoutInput 
        handleSubmit={createSubAccount} 
        banks={banks}
        submitting={submitting}
        bankDetails={bankDetails}
        setBankDetails={setBankDetails}
        />
      </div>
      <p className='text-center mt-10 font-extrabold text-lg'>All sales will incur a 10% Hudsuller fee + 2.5% Paystack fee.</p>
    </section>
  )
}

export default page