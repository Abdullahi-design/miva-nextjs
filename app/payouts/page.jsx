"use client"
import DisplayBank from '@components/DisplayBank';
import PayoutInput from '@components/PayoutInput'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [banks, setBanks] = useState([]);
  const [submitting, setIsSubmitting] = useState(false);
  const [bankDetails, setBankDetails] = useState({ 
    bankName: "",
    accountNumber: "",
    aliseName: "",
    bankCode: "",
    percentageCharges: (0.12 * 100),
  });
  const [dataFetched, setDataFetched] = useState();
  const [status, setStatus] = useState(false);

  useEffect(() => {
    const fetchUserBankAccount = async () => {
      const response = await fetch(`/api/payments/create-subAccount/${session?.user.id}`)
      const responseData = await response.json();
      
      // setBanks(responseData.data);
      setDataFetched(responseData?.paystackResult?.data);
      setStatus(responseData?.paystackResult?.data?.active);
      console.log(responseData, 'listBanks');
    };
    
    if (session?.user.id) fetchUserBankAccount();
  }, [session?.user.id]);

  // console.log({status, dataFetched});

  useEffect(() => {
    if (!status) {
      const fetchbankList = async () => {
        try {
          const response = await fetch(`/api/payments/listBanks`);
          const responseData = await response.json();

          setBanks(responseData.data);
          // console.log(listBanks, 'listBanks');
        } catch (error) {
          console.error('Error fetching banks:', error);
        }
      };

      if (session?.user.id) fetchbankList();
    }
  }, [session?.user.id, dataFetched, status]);

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

      if (response.ok) {
        router.push('/');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className='block'>
      <div className='md:flex block gap-3 md:space-y-0 space-y-3'>
        {status ? (
          <DisplayBank 
            key={dataFetched.id}
            dataFetched={dataFetched} 
          />
        ):(
          <PayoutInput 
            handleSubmit={createSubAccount} 
            banks={banks}
            submitting={submitting}
            bankDetails={bankDetails}
            setBankDetails={setBankDetails}
          />
        )}
      </div>
      <p className='text-center mt-10 font-extrabold text-lg'>All sales will incur a 10% Hudsuller fee + 1.5% Paystack fee.</p>
    </section>
  )
}

export default page