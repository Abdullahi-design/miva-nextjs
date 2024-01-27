// ProductCardSkeleton.js

import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className='prompt_card skeleton'>
      <div className='flex justify-between items-start gap-5'>
        <div className='flex-1 flex justify-start items-center gap-3'>
          <div className='skeleton-avatar'></div>
          <div className='skeleton-text'></div>
        </div>
        <div className='skeleton-icon'></div>
      </div>

      <div className="skeleton-media"></div>
      <div className='skeleton-text'></div>
      <div className="flex justify-between w-full">
        <div className='skeleton-meta'></div>
        <div className='skeleton-button'></div>
      </div>

      <div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
        <div className='skeleton-action'></div>
        <div className='skeleton-action'></div>
        <div className='skeleton-action'></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
