import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex w-full mt-16 gap-4 justify-center'>
        <p>Powered by</p>
        <Link href='/' className='flex gap-2 flex-center'>
            <Image
            src='/assets/images/hudsuller_logo.png'
            alt='logo'
            width={150}
            height={150}
            className='object-contain'
            />
        </Link>
    </div>
  )
}

export default Footer