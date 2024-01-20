"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import ProductCard from "@components/ProductCard";

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
          navigator.clipboard.writeText(affiliateLink);
          // Optionally, you can show a notification or perform any other UI feedback
          alert("Affiliate link copied to clipboard!");
        }
    };

    if (!products) {
        return <div>Loading...</div>; // Add a loading state
    }

    return (
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
    );
};

export default AffiliateProduct;
