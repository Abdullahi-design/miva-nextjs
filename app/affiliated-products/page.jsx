"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Discover from "@components/Discover";

const MyProfile = () => {
    const router = useRouter();
    const { data: session } = useSession();
    const [myProducts, setMyProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            const response = await fetch(`/api/product`);
            const data = await response.json();

            // Filter products with commission greater than 0
            const filteredProducts = data.filter(product => product.commission > 0);

            setMyProducts(filteredProducts);
            console.log(filteredProducts);
        };

        if (session?.user.id) fetchProducts();
    }, [session?.user.id]);

    return (
        <Discover
            name='Discover Products'
            desc='Pick a product, sell and make money'
            data={myProducts}
        />
    );
};

export default MyProfile;
