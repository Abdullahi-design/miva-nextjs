import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FiLoader } from "react-icons/fi";

const AffiliateForm = ({ type, desc, product }) => {
    const router = useRouter();

    const [commissionValues, setCommissionValues] = useState(Array(product.length).fill(""));
    const [submitting, setIsSubmitting] = useState(false);
  
    const handleCommissionChange = (index, value) => {
      // Parse the value to a number
      const parsedValue = parseFloat(value);
    
      // Check if the value is a valid number and within the range [0, 100]
      if (!isNaN(parsedValue) && parsedValue >= 0 && parsedValue <= 100) {
        setCommissionValues((prevValues) => {
          const newValues = [...prevValues];
          newValues[index] = parsedValue;
          return newValues;
        });
      }
    };
    
  
    const updateProduct = async (e, product) => {
      e.preventDefault();
      setIsSubmitting(true);

        if (!product._id) {
            return alert("Missing ProductId!")
        }
  
      try {
        const response = await fetch(`/api/affiliate/${product._id}`, {
          method: "PATCH",
          body: JSON.stringify({
            commission: product.commission,
          })
        });

        console.log(response.status);
        if (response.ok) {
            console.log("Product updated successfully!");
        } else {
            console.error("Failed to update product:", response.statusText);
        }

        if (response.ok) {
            // Call the onRedirect callback passed from the parent component
            router.push('/');
          }
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{type} your Product</span>
        </h1>
        <p className='desc text-left max-w-md'>{desc}</p>
  
        {product && product.length > 0 ? (
          product.map((item, index) => (
            <form
              key={item._id}
              onSubmit={(e) => updateProduct(e, { ...item, commission: commissionValues[index] })}
              className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
            >
              <div className="flex justify-between border-b border-gray-300 py-2">
                <label>
                  <span className='font-satoshi font-semibold text-base text-gray-700'>Product </span>
                  <div>{item.productName}</div>
                </label>
  
                <label>
                  <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Commission <span className='font-normal'>(%)</span>
                  </span>
                  <input
                    type='number'
                    placeholder='Commission %'
                    className='form_input'
                    value={commissionValues[index] || item.commission}
                    onChange={(e) => handleCommissionChange(index, e.target.value)}
                  />
                </label>
              </div>
  
              <div className='flex-end mx-3 mb-5 gap-4'>
                <Link
                  href='/'
                  className='text-gray-500 text-sm px-5 py-1 rounded-full hover:border-2 hover:border-primary-orange'
                >
                  Cancel
                </Link>
  
                <button
                  type='submit'
                  id={item._id}
                  disabled={submitting}
                  className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                >
                  {submitting ? `${type}ing...` : type}
                </button>
              </div>
            </form>
          ))
        ) : (
          <span className=" w-full mt-12">
            <FiLoader className='h-32 w-32 mx-auto animate-spin text-muted-foreground' />
          </span>
        )}
      </section>
    );
  };
  
  export default AffiliateForm;
  
