import Image from 'next/image'
import React from 'react'

const ProductInfo = ({ product }) => {
    return (
        <div className='product_card_info'>
            <div className='flex justify-between items-center gap-5'>
                <div
                    className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
                    // onClick={handleProfileClick}
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
                    {/* <p className='font-inter text-sm text-gray-500'>
                        {product.creator.email}
                    </p> */}
                    </div>
                </div>

            </div>

            <Image
            src={product.coverImage}
            width={500}
            height={500}
            alt='Cover Image Preview'
            className='mt-2 max-w-full h-auto object-cover rounded-md'
                
            />

            <p className='my-4 font-satoshi text-sm text-gray-700'>{product.productName}</p>
            <div className="flex justify-between w-full">
                <span className="w-fit -mt-1.5">
                    <button
                        type='submit'
                        // disabled={submitting}
                        // onClick={() => buyProduct()}
                        className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white whitespace-nowrap'
                    >
                        {product.cta}
                    </button>
                </span>
            </div>
        </div>
    )
}

export default ProductInfo