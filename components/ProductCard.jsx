"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaRegStar, FaStar } from "react-icons/fa";

const ProductCard = ({ product, handleEdit, handleDelete, handleTagClick }) => {
  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const [copied, setCopied] = useState("");
  const [submitting, setIsSubmitting] = useState(false);

  const handleProfileClick = () => {
    // console.log(product);

    if (product.creator._id === session?.user.id) return router.push("/profile");

    router.push(`/profile/${product.creator._id}?name=${product.creator.username}`);
  };

  const handleCopy = () => {
    setCopied(product.productName);
    navigator.clipboard.writeText(product.productName);
    setTimeout(() => setCopied(false), 3000);
  };

  const buyProduct = async (e) => {
    // e.preventDefault();
    setIsSubmitting(true);
    alert("Work in progress");

    try {
    // const response = await fetch("/api/product/new", {
    //   method: "POST",
    //   body: JSON.stringify({
    //   productName: product.productName,
    //   description: product.description,
    //   metaData: product.metaData,
    //   price: product.price,
    //   coverImage: product.coverImage,
    //   thumbnail: product.thumbnail,
    //   category: product.category,
    //   cta: product.cta,
    //   userId: session?.user.id,
    //   }),
    // });

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
    <div className='prompt_card'>
      <div className='flex justify-between items-start gap-5'>
        <div
          className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
          onClick={handleProfileClick}
        >
          <Image
            src={product.creator.image}
            alt='user_image'
            width={40}
            height={40}
            className='rounded-full object-contain'
          />

          <div className='flex flex-col'>
            <h3 className='font-satoshi font-semibold text-gray-900'>
              {product.creator.username}
            </h3>
            <p className='font-inter text-sm text-gray-500'>
              {product.creator.email}
            </p>
          </div>
        </div>

        <div className='copy_btn ' onClick={handleCopy}>
          {copied === product.productName ? <FaRegStar className="w-4 h-4" /> : <FaStar className="w-4 h-4" />}
        </div>

      </div>

      <Image
        src={product.coverImage}
        width={300}
        height={300}
        alt='Cover Image Preview'
        className='mt-2 max-w-full h-auto object-contain rounded-md'
             
      />

      <p className='my-4 font-satoshi text-sm text-gray-700'>{product.productName}</p>
      <div className="flex justify-between w-full">
        <p
          className='font-inter text-sm blue_gradient cursor-pointer'
          onClick={() => handleTagClick && handleTagClick(product.metaData)}
        >
          {/* remove if metaData starts with "#" */}
          #{product.metaData.replace(/^#/, '')} 
        </p>
        {pathName !== "/profile" && (
          <span className="w-fit -mt-1.5">
            <button
              type='submit'
              disabled={submitting}
              onClick={() => buyProduct()}
              className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white whitespace-nowrap'
            >
              {product.cta}
            </button>
          </span>
        )}
      </div>

      {session?.user.id === product.creator._id && pathName === "/profile" && (
        <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
          <p
            className='font-inter text-sm green_gradient cursor-pointer'
            onClick={handleEdit}
          >
            Edit
          </p>
          <p
            className='font-inter text-sm orange_gradient cursor-pointer'
            onClick={handleDelete}
          >
            Delete
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductCard;