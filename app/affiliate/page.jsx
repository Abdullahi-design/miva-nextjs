"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";
import AffiliateForm from "@components/AffiliateForm";
import { useSession } from "next-auth/react";

const AffiliateProduct = () => {
    const searchParams = useSearchParams();
    const productId = searchParams.get("id");
    const { data: session } = useSession();
    const [product, setProduct] = useState([]);
    

    useEffect(() => {
        const fetchProducts = async () => {
          const response = await fetch(`/api/users/${session?.user.id}/products`);
          const data = await response.json();
    
          setProduct(data);
          console.log(data, 'data')
        };
    
        if (session?.user.id) fetchProducts();
    }, [session?.user.id]);

    // console.log(product);

    return (
        <AffiliateForm
            type='Affiliate'
            desc='Let people help you sell your product faster.'
            product={product}
            setProduct={setProduct}
            productId={productId}
        />
    );
};

export default AffiliateProduct;