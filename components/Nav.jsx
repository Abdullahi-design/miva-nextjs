"use client";

import Image from "next/image";
import Link from "next/link";
import AuthBtn from "./ui/AuthBtn";

const Nav = () => {

  return (
    <nav className='flex justify-between w-full mb-16 pt-3'>
      <div className="flex md:hidden mt-2">
        <Link href='/' className='gap-2 flex-center'>
          <Image
            src='/assets/images/miva-white.jpeg'
            alt='logo'
            width={100}
            height={100}
            className='object-contain'
          />
        </Link>
      </div>
      <div className="sm:flex hidden">
        <AuthBtn/>
      </div>
    </nav>
  );
};

export default Nav;