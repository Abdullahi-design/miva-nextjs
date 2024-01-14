import React from 'react'

const Button = ({ product }) => {
  return (
    <button  
    type='submit'
    className='w-fit px-4 py-2 text-xl bg-primary-orange hover:bg-white hover:text-gray-700 border border-primary-orange rounded-md font-satoshi text-white'>
        {product.cta}
    </button>
  )
}

export default Button