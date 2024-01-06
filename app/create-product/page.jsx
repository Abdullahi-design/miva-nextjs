"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@components/Form";

const CreateProduct = () => {
    const router = useRouter();
    const { data: session } = useSession();

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

    const createProduct = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
        const response = await fetch("/api/product/new", {
            method: "POST",
            body: JSON.stringify({
            productName: product.productName,
            description: product.description,
            metaData: product.metaData,
            price: product.price,
            coverImage: product.coverImage,
            thumbnail: product.thumbnail,
            category: product.category,
            cta: product.cta,
            userId: session?.user.id,
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
            type='Create'
            product={product}
            setProduct={setProduct}
            submitting={submitting}
            handleSubmit={createProduct}
        />
    );
};

export default CreateProduct;