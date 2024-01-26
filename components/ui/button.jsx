import React from 'react'

const Button = ({ product }) => {

  const buyProduct = async (e) => {
    e.preventDefault();
    // setIsSubmitting(true);
    alert("Work in progress");

    // try {
    //   const response = await fetch('/api/payments/create-payment', {
    //     method: 'POST',
    //     body: JSON.stringify({
    //       productName: product.productName,
    //       description: product.description,
    //       price: product.price,
    //     })
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     setPaymentData(data);
    //   } else {
    //     console.error('Failed to create payment:', response.statusText);
    //   }

    //   // if (response.ok) {
    //   //   router.push("/");
    //   // }
    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <button  
    type='submit'
    onClick={(e) => buyProduct(e)}
    className='w-fit px-4 py-2 text-xl bg-primary-orange hover:bg-white hover:text-gray-700 border border-primary-orange rounded-md font-satoshi text-white'
    >
      {product.cta}
    </button>
  )
}

export default Button