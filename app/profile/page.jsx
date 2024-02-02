"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import AffiliateForm from "@components/modal/AffiliateForm";
import ProductCardSkeleton from "@components/skeletonLoader/ProductCardSkeleton";

const MyProfile = () => {
  const router = useRouter();
  const { data: session } = useSession();
  

  const [myProducts, setMyProducts] = useState([]);
  const [products, setproducts] = useState([]);
  const [showAffiliateModal, setShowAffiliateModal] = useState(false);

  const handleAffiliateClick = (product) => {
    // handleAffiliate()
    setproducts(product)
    setShowAffiliateModal(true);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/products`);
      const data = await response.json();

      setMyProducts(data);
      // console.log(data)
    };

    if (session?.user.id) fetchProducts();
  }, [session?.user.id]);

  const handleEdit = (product) => {
    router.push(`/update-product?id=${product._id}`);
  };

  const handleAffiliate = (product) => {
    router.push(`/affiliate?id=${product._id}`);
  };
  const handleDelete = async (product) => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this product?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/product/${product._id.toString()}`, {
          method: "DELETE",
        });

        const filteredProducts = myProducts.filter((item) => item._id !== product._id);

        setMyProducts(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      <Profile
        name='My'
        desc='Welcome to your personalized store. Share your exceptional products and inspire others.'
        data={myProducts}
        handleAffiliateClick={handleAffiliateClick}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
      {showAffiliateModal ? (
        // myProducts.map(product => (
          <AffiliateForm
          // key={product._id}
            product={products}
            setShowAffiliateModal={setShowAffiliateModal}
            type="commisson"
            desc=""
            onClose={() => setShowAffiliateModal(false)}
            /* other necessary props for AffiliateForm */
          />
        // ))
      ):( 
        myProducts.length === 0 ? <ProductCardSkeleton /> : null
    )}
    </>
  );
};

export default MyProfile;