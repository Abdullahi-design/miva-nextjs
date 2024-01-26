import { useState } from "react";
import ProductCard from "./ProductCard";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Discover = ({ name, desc, product }) => {

  const router = useRouter()

    const [Issubmitting, setIsSubmitting] = useState(false);
    const { data: session } = useSession();


    const generateAffiliateLink = async (e, product) => {
        e.preventDefault();
        setIsSubmitting(true);

        // console.log(clickedProduct, 'here');
  
            if (!product._id) {
                return alert("Missing ProductId!")
            }

              // Ensure session is available and has a valid user.id
            if (!session || !session.user || !session.user.id) {
                console.error("User session not available or missing user id");
                setIsSubmitting(false);
                return;
            }
            const userId = session.user.id;
    
        try {
          const response = await fetch(`/api/affiliate/generate-affiliate-link/${product._id}`, {
            method: "POST",
            body: JSON.stringify({
                userId: userId,
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
              router.push('/affiliate');
            }
        } catch (error) {
          console.error(error);
        } finally {
          setIsSubmitting(false);
        }
    };

  return (
    <section className='w-full'>
      <div className="flex justify-between w-full">
        <h1 className='head_text text-left'>
          <span className='blue_gradient'>{name}</span>
        </h1>
      </div>
      <p className='desc text-left'>{desc}</p>

      <div className='mt-10 prompt_layout'>
        {product.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            generateAffiliateLink={generateAffiliateLink}
            Issubmitting={Issubmitting}
          />
        ))}
      </div>
    </section>
  );
};

export default Discover;