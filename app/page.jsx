"use client";

import { useRouter } from "next/navigation"

const Home = () => {
  const router = useRouter()
  return (
    <section className="">
      
      <div 
      onClick={() => router.push('/courses')}
      className="home_card_btn cursor-pointer my-32 w-[25rem] h-[10rem] flex-center flex-col"
    >
      <div className='mb-2 p-1.5 flex justify-between gap-5'>
        <h2 className="text-md md:text-xl font-semibold">Get Courses</h2>
      </div>
    </div>
    </section>
  )
}

export default Home