import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const AffiliateForm = ({ type, setShowAffiliateModal, product }) => {
    const router = useRouter();

    const [commissionValues, setCommissionValues] = useState(product ? product.commission : "");
    const [submitting, setIsSubmitting] = useState(false);
  
    const handleCommissionChange = (value) => {
      // Parse the value to a number
      const parsedValue = parseFloat(value);
    
      // Clamp the value between 0 and 100
      const clampedValue = Math.min(100, Math.max(0, parsedValue));
    
      // Update the commission value in the state
      setCommissionValues(clampedValue);
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
            commission: commissionValues,
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
            setShowAffiliateModal(false)
          }
      } catch (error) {
        console.error(error);
      } finally {
        setIsSubmitting(false);
      }
    };

    return (
      <section className='fixed inset-0 z-10 flex items-center justify-center'>
        <div 
        onClick={() => setShowAffiliateModal(false)}
        className="fixed inset-0 bg-opacity-5 backdrop-blur-sm bg-black"></div>
        <form
          key={product._id}
          onSubmit={(e) => updateProduct(e, { ...product, commission: commissionValues })}
          className='mt-10 z-20 w-full max-w-2xl flex flex-col gap-7 bg-white p-4 rounded-lg'
        >
          <div className="flex justify-between border-b border-gray-300 py-2">
            <label>
              <span className='font-satoshi font-semibold text-base text-gray-700'>Product </span>
              <div>{product.productName}</div>
            </label>

            <label>
              <span className='font-satoshi font-semibold text-base text-gray-700'>
                Commission <span className='font-normal'>(%)</span>
              </span>
              <input
                type='number'
                placeholder='Commission %'
                className='form_input border-black border'
                value={commissionValues || product.commission}
                onChange={(e) => handleCommissionChange(e.target.value)}
              />
            </label>
          </div>

          <div className='flex-end mx-3 mb-5 gap-4'>
            <span
              onClick={() => setShowAffiliateModal(false)}
              className=' cursor-pointer text-gray-500 text-sm px-5 py-1 rounded-full hover:border-2 hover:border-primary-orange'
            >
              Cancel
            </span>

            <button
              type='submit'
              id={product._id}
              disabled={submitting}
              className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
            >
              {submitting ? `${type}ing...` : type}
            </button>
          </div>
        </form>
      </section>
    );
  };
  
  export default AffiliateForm;
  
