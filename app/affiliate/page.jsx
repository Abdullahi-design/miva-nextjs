"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import AffiliateForm from "@components/AffiliateForm";
import { useSession } from "next-auth/react";
import ProductCard from "@components/ProductCard";

const AffiliateProduct = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get("id");
    const { data: session } = useSession();
    const [product, setProduct] = useState(null);
    

    useEffect(() => {
        const fetchData = async () => {
          if (session?.user.id) {
            // Fetch affiliated products
            const response = await fetch(`/api/affiliate/generate-affiliate-link/${session.user.id}`);
            const data = await response.json();
            // setProduct(data);
            console.log(data, 'affiliate data');
    
            // Check if a product ID exists before making the second API call
            if (data.productId) {
              const productResponse = await fetch(`/api/affiliate/${data.productId}`);
              const productData = await productResponse.json();
              setProduct(productData);
              console.log(productData, 'affiliate data product');
            }
          }
        };
    
        fetchData();
    }, [session?.user.id]);

    if (!product) {
        return <div>Loading...</div>; // Add a loading state
    }

    // console.log(product);

    return (
        // <div>hi</div>
        <ProductCard
            type='Affiliate'
            desc='Let people help you sell your product faster.'
            product={product}
            setProduct={setProduct}
            productId={productId}
        />
    );
};

export default AffiliateProduct;