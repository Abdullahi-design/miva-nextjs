import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex w-full mt-16 gap-4 justify-center'>
        <p className='mt-2 text-md font-medium md:flex hidden'>Powered by</p>
        <Link href='/' className='flex gap-2 flex-center'>
            <Image
            src='/assets/icons/favicon.png'
            alt='logo'
            width={100}
            height={100}
            className='object-contain'
            />
        </Link>
    </div>
  )
}

export default Footer