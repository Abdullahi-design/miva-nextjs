"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { FiHome, FiBox, FiUsers, FiShoppingCart, FiBarChart2, FiMail, FiClipboard, FiMenu, FiX } from 'react-icons/fi';
import { TbCurrencyNaira } from "react-icons/tb";
import { FaGift } from "react-icons/fa";

import { useSession } from 'next-auth/react';
import Image from 'next/image';

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const { data: session } = useSession();

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const menuItems = [
    { title: 'Home', icon: <FiHome />, href: '/' },
    // { title: 'Product', icon: <FiBox />, href: '/product' },
    { title: 'Create Product', icon: <FiBox />, href: '/create-product' },
    { title: 'Affiliate', icon: <FiUsers />, href: '/affiliate' },
    { title: 'Affiliated products', icon: <FaGift />, href: '/affiliated-products' },
    { title: 'Payouts', icon: <TbCurrencyNaira  className='bg-white text-gray-800 rounded-full' />, href: '/payouts' },
    { title: 'Cart', icon: <FiShoppingCart />, href: '/payouts' },
    // { title: 'Sales', icon: <FiShoppingCart />, href: '/sales' },
    // { title: 'Analytics', icon: <FiBarChart2 />, href: '/analytics' },
    // { title: 'Email', icon: <FiMail />, href: '/email' },
    // { title: 'Workflow', icon: <FiClipboard />, href: '/workflow' },
  ];

  return (
    <>
      {/* Sidebar */}
      <nav
        className={`z-20 bg-gray-800 h-screen w-full fixed left-0 top-0 overflow-x-hidden ${
          isSidebarOpen ? '' : 'md:block hidden'
        } md:w-64 transition-all duration-300`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <Link href='/' className='gap-2 flex-center'>
          <Image
            src='/assets/images/hudsuller_logo_light.png'
            alt='logo'
            width={150}
            height={150}
            className='object-contain'
          />
          {/* <p className='logo_text'>Hudsuller</p> */}
        </Link>
          <button className="text-white" onClick={toggleSidebar}>
            <FiX />
          </button>
        </div>
        <div className="p-4">
          {menuItems.map((item, index) => (
            <Link href={item.href} key={index}>
              <div className=" border-b p-2 py-5 border-gray-200 flex items-center text-gray-300 hover:bg-gray-700 transition duration-300">
                <span className="mr-2">{item.icon}</span>
                {item.title}
              </div>
            </Link>
          ))}
        </div>
          {session?.user && (
            <Link href={'/profile'}>
              <div className='p-4 bottom-0 text-gray-300 hover:bg-gray-700 transition duration-300 fixed flex gap-3 justify-between items-center'>
                <Image
                  src={session?.user.image}
                  width={37}
                  height={37}
                  className='rounded-full'
                  alt='profile'
                  onClick={() => setToggleDropdown(!toggleDropdown)}
                />
                <p className=' font-satoshi text-white font-extrabold'>{session?.user?.name}</p>
              </div>
            </Link>
          )}
      </nav>

      {/* Toggle button on top-right corner */}
      <button
        className={`md:hidden fixed z-30 top-4 right-4 p-2 text-white bg-gray-800 rounded-md ${
          isSidebarOpen ? 'md:hidden hidden' : ''
        }`}
        onClick={toggleSidebar}
      >
        {isSidebarOpen ? <FiX /> : <FiMenu />}
      </button>
    </>
  );
};

export default Sidebar;


