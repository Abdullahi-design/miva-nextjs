import React from 'react'
import { FiLoader } from "react-icons/fi";

const Loader = () => {
  return (
    <div className=" w-full mt-12">
      <FiLoader className='h-32 w-32 mx-auto animate-spin text-muted-foreground' />
    </div>
  )
}

export default Loader