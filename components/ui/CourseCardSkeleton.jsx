export const CourseCardSkeleton = () => {
    return (
      <div className="border my-4 p-4 mb-4 rounded-md shadow-md animate-pulse">
        <div className='mb-2 p-1.5 flex justify-between gap-5'>
          <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
          <div className="w-1/2 h-6 bg-gray-300 rounded"></div>
          <div className="w-1/4 h-6 bg-gray-300 rounded"></div>
        </div>
      </div>
    );
};