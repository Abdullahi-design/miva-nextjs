import React from 'react'

const Button = ({ product, buyProduct }) => {
  return (
    <button  
    type='submit'
    onClick={() => buyProduct()}
    className='w-fit px-4 py-2 text-xl bg-primary-orange hover:bg-white hover:text-gray-700 border border-primary-orange rounded-md font-satoshi text-white'
    >
      {product.cta}
    </button>
  )
}

export default Button