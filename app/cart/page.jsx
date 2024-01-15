'use client'

import { IoMdClose } from "react-icons/io";
import { FaCheck } from "react-icons/fa6";
import { FiLoader } from "react-icons/fi";
import { MdRemoveShoppingCart } from "react-icons/md";
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart } from '@app/hooks/use-cart'

const Page = () => {
  const { items, removeItem } = useCart()
  const [isLoading, setIsLoading] = useState(false)

  // const router = useRouter()

  // const { mutate: createCheckoutSession, isLoading } =
  //   trpc.payment.createSession.useMutation({
  //     onSuccess: ({ url }) => {
  //       if (url) router.push(url)
  //     },
  //   })

  // const productIds = items.map(({ product }) => product._id)
  const quantity = items.reduce((total, item) => total + item.quantity, 0);    

  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const cartTotal = items.reduce(
    (total, { product }) => total + product.price,
    0
  )

  const fee = 0;

  return (
    <div className='bg-white'>
      <div className='mx-auto max-w-2xl px-4 pb-24 pt-16 sm:px-6 lg:max-w-7xl lg:px-8'>
        <h1 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl'>
          Shopping Cart
        </h1>

        <div className='mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16'>
          <div
            className={'lg:col-span-7 rounded-lg border-2 border-dashed border-zinc-200 p-12'}>
            <h2 className='sr-only'>
              Items in your shopping cart
            </h2>

            {isMounted && items.length === 0 ? (
              <div className='flex h-full flex-col items-center justify-center space-y-1'>
                <div
                  aria-hidden='true'
                  className='relative mb-4 h-fit w-fit text-muted-foreground'>
                  <MdRemoveShoppingCart className="w-20 h-20" />
                </div>
                <h3 className='font-semibold text-2xl'>
                  Your cart is empty
                </h3>
                <p className='text-muted-foreground text-center'>
                  Whoops! Nothing to show here yet.
                </p>
              </div>
            ) : null}

            <ul
              className={'divide-y divide-gray-200 border-b border-t border-gray-200'}>
              {isMounted &&
                items.map(({ product }) => {
                  // const label = PRODUCT_CATEGORIES.find(
                  //   (c) => c.value === product.category
                  // )?.label

                  // const { image } = product.coverImage

                  return (
                    <li
                      key={product._id}
                      className='flex py-6 sm:py-10'>
                      <div className='flex-shrink-0'>
                        <div className='relative h-24 w-24'>
                          {typeof product.coverImage == 'string' &&
                          product.coverImage ? (
                            <Image
                              fill
                              src={product.coverImage}
                              alt='product image'
                              className='h-full w-full rounded-md object-cover object-center sm:h-48 sm:w-48'
                            />
                          ) : null}
                        </div>
                      </div>

                      <div className='ml-4 flex flex-1 flex-col justify-between sm:ml-6'>
                        <div className='relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0'>
                          <div>
                            <div className='flex justify-between'>
                              <h3 className='text-sm'>
                                <Link
                                  href={`/product/${product._id}`}
                                  className='font-medium text-gray-700 hover:text-gray-800'>
                                  {product.productName}
                                </Link>
                              </h3>
                            </div>

                            {/* <div className='mt-1 flex text-sm'>
                              <p className='text-muted-foreground'>
                                Category: {label}
                              </p>
                            </div> */}

                            <p className='mt-1 text-sm font-medium text-gray-900'>
                            ₦{product.price}
                            </p>
                            <p className='mt-1 text-sm font-medium text-gray-900'>
                              <span className=" font-normal">qty:</span> {quantity}
                            </p>
                          </div>

                          <div className='mt-4 sm:mt-0 sm:pr-9 w-20'>
                            <div className='absolute right-0 top-0'>
                              <button
                                aria-label='remove product'
                                onClick={() =>
                                  removeItem(product._id)
                                }
                                className='w-fit px-4 py-2 border border-primary-orange hover:text-white hover:bg-primary-orange rounded-md font-satoshi text-xl text-gray-700'
                                variant='ghost'>
                                <IoMdClose
                                  className='h-5 w-5'
                                  aria-hidden='true'
                                />
                              </button>
                            </div>
                          </div>
                        </div>

                        {product.category == 'physical product' && (
                          <p className='mt-4 flex space-x-2 text-sm text-gray-700'>
                            <FaCheck className='h-5 w-5 flex-shrink-0 text-green-500' />

                            <span>
                              Eligible for instant delivery
                            </span>
                          </p>
                        )}
                      </div>
                    </li>
                  )
                })}
            </ul>
          </div>

          <section className='mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8'>
            <h2 className='text-lg font-medium text-gray-900'>
              Order summary
            </h2>

            <div className='mt-6 space-y-4'>
              <div className='flex items-center justify-between'>
                <p className='text-sm text-gray-600'>
                  Subtotal
                </p>
                <p className='text-sm font-medium text-gray-900'>
                  {isMounted ? (
                    cartTotal
                  ) : (
                    <FiLoader className='h-4 w-4 animate-spin text-muted-foreground' />
                  )}
                </p>
              </div>

              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <span>Flat Transaction Fee</span>
                </div>
                <div className='text-sm font-medium text-gray-900'>
                  {isMounted ? (
                    <span>₦{fee}</span>
                  ) : (
                    <FiLoader className='h-4 w-4 animate-spin text-muted-foreground' />
                  )}
                </div>
              </div>
              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <div className='flex items-center text-sm text-muted-foreground'>
                  <span>Quantity</span>
                </div>
                <div className='text-sm font-medium text-gray-900'>
                  {isMounted ? (
                    <span>{quantity}</span>
                  ) : (
                    <FiLoader className='h-4 w-4 animate-spin text-muted-foreground' />
                  )}
                </div>
              </div>

              <div className='flex items-center justify-between border-t border-gray-200 pt-4'>
                <div className='text-base font-medium text-gray-900'>
                  Order Total
                </div>
                <div className='text-base font-medium text-gray-900'>
                  {isMounted ? (
                    <span>₦{(cartTotal + fee) * quantity}</span>
                  ) : (
                    <FiLoader className='h-4 w-4 animate-spin text-muted-foreground' />
                  )}
                </div>
              </div>
            </div>

            <div className='mt-6'>
              <button
                // disabled={items.length === 0 || isLoading}
                // onClick={() =>
                //   createCheckoutSession({ productIds })
                // }
                className='w-full px-4 py-2 border border-primary-orange hover:text-white hover:bg-primary-orange rounded-md font-satoshi text-xl text-gray-700'
                size='lg'>
                {isLoading ? (
                  <FiLoader className='w-4 h-4 animate-spin mr-1.5' />
                ) : null}
                Checkout
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default Page
