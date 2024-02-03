import React from 'react'

const CourseInfo = ({course}) => {
    console.log(course);
  return (
    <div className="relative border my-4 p-4 mb-4 rounded-md shadow-md">
        <div className='mb-2 p-1.5 flex justify-center gap-5'>
            <h2 className="text-md md:text-xl font-semibold">{course.courseCode}</h2>
            <h2 className="text-md md:text-xl font-semibold">{course.courseName}</h2>
        </div>
        <div className="rounded-lg overflow-hidden md:w-[40rem] w-full h-[25rem] md:h-[30rem] ">
            <video className="object-fill w-full h-full rounded-md"  controls>
            <source src={course.videos} type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        </div>
        <div className='flex mt-4 justify-around'>
            <button className='quiz_btn'>Take Quiz</button>
            <button className='black_btn'>Take Note</button>
        </div>
    </div>
  )
}

export default CourseInfo