import PayoutCard from '@components/PayoutCard'
import React from 'react'

const page = () => {
  const paymentMethods = [
    {id: 1, name: "Paystack", href: "https://dashboard.paystack.com/#/login?next=pages.one", transactionFee: 0.025},
    {id: 2, name: "Monnie Point", href: "#", transactionFee: 0},
  ]
  return (
    <section className='block'>
      <div className='mt-16 md:flex block gap-3 md:space-y-0 space-y-3'>
        {paymentMethods.map(paymentMethod =>
          <PayoutCard 
            key={paymentMethod.id}
            paymentMethod={paymentMethod} 
          />
        )}
      </div>
      <p className='text-center mt-10 font-extrabold text-lg'>All sales will incur a 10% Hudsuller fee + 2.5% Paystack fee.</p>
    </section>
  )
}

export default page