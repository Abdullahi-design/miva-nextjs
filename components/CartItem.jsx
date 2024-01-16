import { useCart } from '@app/hooks/use-cart';
import Image from 'next/image';
import { FaRegImage } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";
import { displayMedia } from './displayMedia';



const CartItem = ({ product, quantity }) => {
    // console.log(product);

    const { removeItem } = useCart()

    return (
        <div className='space-y-3 py-2'>
            <div className='flex items-start justify-between gap-4'>
                <div className='flex items-center space-x-4'>
                    <div className='relative aspect-square h-16 w-16 min-w-fit overflow-hidden rounded'>
                        {product.coverImage ? (
                            <div>
                                {displayMedia(product)}
                            </div>
                            ) : (
                            <div className='flex h-full items-center justify-center bg-secondary'>
                                <FaRegImage
                                aria-hidden='true'
                                className='h-4 w-4 text-muted-foreground'
                                />
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col self-start'>
                        <span className='line-clamp-1 text-sm font-medium mb-1'>
                        {product.productName}
                        </span>

                        <div className='mt-4 text-xs text-muted-foreground text-red-700'>
                        <button
                            onClick={() => removeItem(product._id)}
                            className='flex items-center gap-0.5'>
                            <IoMdClose className='w-3 h-4' />
                            Remove
                        </button>
                        </div>
                    </div>
                </div>

                <div className='flex flex-col space-y-1 font-medium'>
                <span className='ml-auto line-clamp-1 text-sm'>
                ₦{product.price}
                </span>
                <span className='text-xs text-muted-foreground'>
                    Quantity: {quantity}
                </span>
                </div>
            </div>
        </div>
    )
}

export default CartItem
