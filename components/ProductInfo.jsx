// ProductInfo.jsx

import Image from 'next/image';
import React from 'react';
import AddToCartButton from './AddToCart';
import Button from './ui/button';

const ProductInfo = ({ product }) => {
  return (
    <div className='product-card-info flex flex-col lg:flex-row lg:gap-8 border border-gray-300 rounded-lg overflow-hidden'>

      <div className='lg:w-1/2 border-r border-gray-300'>
        <Image
          src={product.coverImage}
          width={1200}
          height={800}
          alt='Cover Image Preview'
          className='object-cover rounded-md '
        />
      </div>

      <div className='lg:w-1/2 p-6'>
        <div className='border-b border-gray-300 pb-4'>
          <div className='flex items-center gap-3 cursor-pointer mb-2'>
            <Image
              src={product.creator.image}
              alt='user_image'
              width={40}
              height={40}
              className='rounded-full object-cover'
            />
            <div>
              <h3 className='font-satoshi font-semibold text-gray-900'>
                {product.creator.username}
              </h3>
            </div>
          </div>
          <p className='font-satoshi text-2xl text-gray-700'>{product.productName}</p>
        </div>

        <div className='border-b border-gray-300 mt-4 pb-4'>
          <p className='rich-text text-gray-700'>{product.description}</p>
        </div>

        <div className='mt-4'>
          <p className='w-fit px-4 py-1.5 rounded-md font-satoshi text-xl text-gray-700'>₦{product.price}</p>
          <div className='flex justify-around'>
            <Button product={product}>
              {product.cta}
            </Button>
            <AddToCartButton product={product}/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
