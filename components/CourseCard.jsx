import React from 'react'

const CourseCard = ({ course, handleCourseDetailsClick }) => {

  return (
    <div 
    className="border my-4 p-4 mb-4 rounded-md shadow-md"
    >
      <div className='mb-2 p-1.5 flex justify-between gap-5'>
        {/* <label htmlFor="courseCode"></label> */}
        <h2 className="text-md md:text-xl font-semibold">{course.courseCode}</h2>
        <h2 className="text-md md:text-xl font-semibold">{course.courseName}</h2>
        <button 
        onClick={() => handleCourseDetailsClick(course)}
        className='text-md hover:underline hover:text-blue-800 text-blue-600'
        >
          Details
        </button>
      </div>
    </div>
  )
}

export default CourseCard