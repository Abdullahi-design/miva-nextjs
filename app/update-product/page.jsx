"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import Form from "@components/Form";

const EditProduct = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const productId = searchParams.get("id");

    const [submitting, setIsSubmitting] = useState(false);
    const [product, setProduct] = useState({ 
        productName: "",
        description: "", //description
        metaData: "", //SEO keywords
        price: "",
        coverImage: "",
        thumbnail: "testing",
        category: "",
        cta: ""
    });

    useEffect(() => {
        const getProductDetails = async () => {
          const response = await fetch(`/api/product/${productId}`);
          const data = await response.json();
    
          setProduct({
            productName: data.productName,
            description: data.description,
            metaData: data.metaData,
            price: data.price,
            coverImage: data.coverImage,
            thumbnail: data.thumbnail,
            category: data.category,
            cta: data.cta,
          });
        };
    
        if (productId) getProductDetails();
    }, [productId]);

    const updateProduct = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!productId) return alert("Missing ProductId!");

        try {
        const response = await fetch(`/api/product/${productId}`, {
            method: "PATCH",
            body: JSON.stringify({
            productName: product.productName,
            description: product.description,
            metaData: product.metaData,
            price: product.price,
            coverImage: product.coverImage,
            thumbnail: product.thumbnail,
            category: product.category,
            cta: product.cta,
            }),
        });

        if (response.ok) {
            router.push("/");
        }
        } catch (error) {
        console.log(error);
        } finally {
        setIsSubmitting(false);
        }
    };

    return (
        <Form
            type='Edit'
            product={product}
            setProduct={setProduct}
            submitting={submitting}
            handleSubmit={updateProduct}
        />
    );
};

export default EditProduct;