"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ProductCard from "@components/ProductCard";
import { extractUserInfoFromAffiliateLink } from "@utils/generateAffiliateLink";
import ProductCardSkeleton from "@components/skeletonLoader/ProductCardSkeleton";

const AffiliateProduct = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get("id");
    const { data: session } = useSession();
    const [products, setProducts] = useState(null);
    const [affiliateLink, setAffiliateLink] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {

                if (session?.user.id) {
                    // Fetch affiliated products
                    const response = await fetch(`/api/affiliate/generate-affiliate-link/${session.user.id}`);
                    const data = await response.json();
                    // setProducts(data); // Assuming data is an array of products
                    console.log(data, 'affiliate data');
    
                    // Check if products exist before making the second API call
                    if (data.length > 0) {
                        const productPromises = data.map(async (product) => {
                            setAffiliateLink(product.affiliateLink)
                            const productResponse = await fetch(`/api/affiliate/${product.productId}`);
                            return await productResponse.json();
                        });
    
                        // Wait for all promises to resolve before setting products
                        const productData = await Promise.all(productPromises);
                        setProducts(productData);
                        console.log(productData, 'affiliate data products');
                    }
                }
                
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [session?.user.id]);

    const copyAffiliateLink = () => {
        if (affiliateLink) {
            
            const affiliateProductLink = extractUserInfoFromAffiliateLink(affiliateLink);
            if (affiliateProductLink) {

                const URL = 'http://localhost:3000';
                navigator.clipboard.writeText(`${URL}/products/${affiliateProductLink.productId}?affiliateId=${affiliateProductLink.userId}`);
                alert("Affiliate link copied to clipboard!");

            } else {
                console.error('Error decoding affiliate link');
            }
        }
    };

    if (!products) {
        return <ProductCardSkeleton/>; // Add a loading state
    }

    return (
        <section className='w-full'>
        <div className="flex justify-between w-full">
          <h1 className='head_text text-left'>
            <span className='blue_gradient'>Share your product</span>
          </h1>
        </div>
        <p className='desc text-left'>Copy and share your affiliate link with your customers to make money</p>
  
        <div className='mt-10 prompt_layout'>
            {products.map((product) => (
                <ProductCard
                    key={product._id}
                    type='Affiliate'
                    desc='Let people help you sell your product faster.'
                    product={product}
                    setProduct={setProducts}
                    productId={productId}
                    copyAffiliateLink={copyAffiliateLink}
                />
            ))}
        </div>
        </section>
    );
};

export default AffiliateProduct;
