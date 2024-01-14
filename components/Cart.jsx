'use client'
import { useCart } from "@app/hooks/use-cart";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { MdRemoveShoppingCart } from "react-icons/md";
import { IoMdClose } from "react-icons/io";
import CartItem from "./CartItem";

const Cart = () => {
    const { items } = useCart();
    const itemCount = items.length;
  
    const [isMounted, setIsMounted] = useState(false);
    const [toggleCart, setToggleCart] = useState(false);
  
    useEffect(() => {
      setIsMounted(true);
    }, []);

    const product = items.length > 0 ? items[0].product : null;
    // console.log(product.price);

    const cartTotal = items.reduce((total, { product }) => total + product.price, 0);
    const fee = 0;
  
    return (
        <div className="relative">
            <div className="cursor-pointer group -m-2 flex items-center p-2" onClick={() => setToggleCart(!toggleCart)}>
                <FiShoppingCart
                    aria-hidden="true"
                    className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                />
                <span className="ml-2 text-sm font-medium text-gray-700 group-hover:text-gray-800">
                    {isMounted ? itemCount : 0}
                </span>
            </div>
    
            {toggleCart && (
                <>
                    <div
                    className="fixed z-10 inset-0 bg-opacity-5 bg-gray-100 backdrop-blur-sm"
                    onClick={() => setToggleCart(false)}
                    ></div>
                    <section className="fixed right-0 top-0 bottom-0 z-20 flex flex-col w-full sm:max-w-sm bg-white">
                    <header className="p-4 border-b border-gray-200 flex justify-between">
                        <h1 className="text-lg font-semibold">Cart ({itemCount})</h1>
                        <span 
                        className="cursor-pointer" 
                        onClick={() => setToggleCart(false)}
                        >
                            <IoMdClose  className="w-6 h-6"/>
                        </span>
                    </header>
                    <div className="flex-1 overflow-y-auto p-4">
                        {itemCount > 0 ? (
                        <>
                            <div className="space-y-4">
                            {items.map(({ product }) => (
                                <div className="py-2 border-b border-gray-300" key={product._id}>
                                    <CartItem product={product} key={product._id} />
                                        <div className="space-y-1.5 text-sm py-2">
                                            {product.category == 'physical product' && (
                                                <div className="flex">
                                                    <span className="flex-1">Shipping</span>
                                                    <span>Free</span>
                                                </div>
                                            )}
                                            {/* <div className="flex">
                                                <span className="flex-1">Transaction Fee</span>
                                                <span>₦{fee}</span>
                                            </div> */}
                                            <div className="flex">
                                                <span className="flex-1">Total</span>
                                                <span>₦{cartTotal + fee}</span>
                                            </div>
                                        </div>
                                </ div>
                            ))}
                            </div>
                            <footer className="p-4 text-center">
                                <button 
                                className='w-full px-4 py-2 text-xl bg-primary-orange hover:bg-white hover:text-gray-700 border border-primary-orange rounded-md font-satoshi text-white'
                                >
                                    <Link href="/cart">Continue to Checkout</Link>
                                </button>
                            </footer>
                        </>
                        ) : (
                        <div className="flex h-full flex-col items-center justify-center space-y-1">
                            <div
                            aria-hidden="true"
                            className="relative mb-4 h-fit w-fit text-muted-foreground"
                            >
                            <MdRemoveShoppingCart className="w-20 h-20" />
                            </div>
                            <div className="text-xl font-semibold">Your cart is empty</div>
                        </div>
                        )}
                    </div>
                    </section>
                </>
            )}
        </div>
    );
};
  
export default Cart;
  
