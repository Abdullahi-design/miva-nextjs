'use client'

import { useCart } from '@app/hooks/use-cart'
import { useEffect, useState } from 'react'

const AddToCartButton = ({ product }) => {
  const { addItem } = useCart()
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSuccess(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [isSuccess])

  return (
    <button
      onClick={() => {
        addItem(product)
        setIsSuccess(true)
      }}
      className='w-fit px-4 py-2 border border-primary-orange hover:text-white hover:bg-primary-orange rounded-md font-satoshi text-xl text-gray-700'>
      {isSuccess ? 'Added!' : 'Add to cart'}
    </button>
  )
}

export default AddToCartButton
