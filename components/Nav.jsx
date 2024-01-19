"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { signIn, signOut, useSession, getProviders } from "next-auth/react";
import Cart from "./Cart";

const Nav = () => {
  const { data: session } = useSession();

  const [providers, setProviders] = useState(null);
  const [toggleDropdown, setToggleDropdown] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getProviders();
      setProviders(res);
    })();
  }, []);

  return (
    <nav className='flex-between w-full mb-16 pt-3'>
      <Link href='/' className='flex gap-2 flex-center'>
        <Image
          src='/assets/images/hudsuller_logo.png'
          alt='logo'
          width={200}
          height={200}
          className='object-contain'
        />
        {/* <p className='logo_text'>Hudsuller</p> */}
      </Link>

      <section className="flex">
        {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
          {session?.user ? (
            <div className='flex gap-3 md:gap-5'>
              <Link href='/affiliated-products' className='affiliate_btn'>
                Affiliate products
              </Link>

              <Link href='/create-product' className='black_btn'>
                Create Product
              </Link>

              <button type='button' onClick={signOut} className='outline_btn'>
                Sign Out
              </button>

              <Link href='/profile'>
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                />
              </Link>
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className='black_btn'
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <div className='sm:hidden flex relative'>
          {session?.user ? (
            <div className='flex'>
              <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={() => setToggleDropdown(!toggleDropdown)}
              />

              {toggleDropdown && (
                <div className='dropdown z-30'>
                  <Link
                    href='/profile'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link>
                  <Link
                    href='/affiliated-products'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Affiliated-products
                  </Link>
                  <Link
                    href='/create-product'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Product
                  </Link>
                  <button
                    type='button'
                    onClick={() => {
                      setToggleDropdown(false);
                      signOut();
                    }}
                    className='mt-5 w-full black_btn'
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              {providers &&
                Object.values(providers).map((provider) => (
                  <button
                    type='button'
                    key={provider.name}
                    onClick={() => {
                      signIn(provider.id);
                    }}
                    className='black_btn'
                  >
                    Sign in
                  </button>
                ))}
            </>
          )}
        </div>
        {session?.user && (<Cart/>)}
      </section>
    </nav>
  );
};

export default Nav;