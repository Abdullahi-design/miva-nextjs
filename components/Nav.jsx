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
    <nav className='flex justify-between w-full mb-16 pt-3'>
      <div className="flex md:hidden ">
        <Link href='/' className='gap-2 flex-center'>
          <Image
            src='/assets/icons/favicon.png'
            alt='logo'
            width={50}
            height={50}
            className='object-contain'
          />
        </Link>
      </div>

      <section className="flex absolute z-30 top-6 right-4">
        <div className='sm:flex hidden'>
          {session?.user ? (
            <button type='button' onClick={signOut} className='outline_btn'>
              Sign Out
            </button>
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
      </section>
    </nav>
  );
};

export default Nav;