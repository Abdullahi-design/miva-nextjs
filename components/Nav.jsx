"use client";

import { getProviders, signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      <div className="md:flex hidden ">
        <Link href='/' className='gap-2 flex-center'>
          <Image
            src='/assets/images/hudsuller_logo.png'
            alt='logo'
            width={200}
            height={200}
            className='object-contain'
          />
          {/* <p className='logo_text'>Hudsuller</p> */}
        </Link>
      </div>
      <div className="flex md:hidden ">
        <Link href='/' className='gap-2 flex-center'>
          <Image
            src='/assets/icons/favicon.png'
            alt='logo'
            width={50}
            height={50}
            className='object-contain'
          />
          {/* <p className='logo_text'>Hudsuller</p> */}
        </Link>
      </div>

      <section className="flex">
        {/* Desktop Navigation */}
        <div className='sm:flex hidden'>
          {session?.user ? (
            <div className='flex gap-3 md:gap-5'>
              {/* <Link href='/discover' className='affiliate_btn'>
                Affiliate products
              </Link> */}

              {/* <Link href='/create-product' className='black_btn'>
                Create Product
              </Link> */}

              {/* <Link href='/payouts' className='payout_btn'>
                Payouts
              </Link> */}

              <button type='button' onClick={signOut} className='outline_btn'>
                Sign Out
              </button>

              {/* <Link href='/profile'>
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                />
              </Link> */}
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
              {/* <Image
                src={session?.user.image}
                width={37}
                height={37}
                className='rounded-full'
                alt='profile'
                onClick={() => setToggleDropdown(!toggleDropdown)}
              /> */}

              {toggleDropdown && (
                <div className='dropdown z-30'>
                  {/* <Link
                    href='/profile'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    My Profile
                  </Link> */}
                  <Link
                    href='/discover'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Affiliated products
                  </Link>
                  <Link
                    href='/create-product'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Create Product
                  </Link>
                  <Link
                    href='/payouts'
                    className='dropdown_link'
                    onClick={() => setToggleDropdown(false)}
                  >
                    Payouts
                  </Link>
                  {/* {session?.user && (<Cart/>)} */}
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
        {/* <div className='hidden sm:flex'>
          {session?.user && (<Cart/>)}
        </div> */}
      </section>
    </nav>
  );
};

export default Nav;