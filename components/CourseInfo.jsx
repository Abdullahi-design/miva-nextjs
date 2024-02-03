import React from 'react'

const CourseInfo = ({course}) => {
  return (
    <div className="relative">
        <div className="rounded-lg left-10 overflow-hidden w-full h-[30rem] absolute">
          <video  
          className="object-cover" 
          loop  controls
        >
            <source src={course.videos} type='video/mp4' />
            Your browser does not support the video tag.
          </video>
        </div>
    </div>
  )
}

export default CourseInfo