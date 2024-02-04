"use client";

import React, { useState } from 'react'
import CourseNote from './CourseNote';

const CourseInfo = ({course}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleTakeNote = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };
    
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
            <button 
            className='black_btn'
            onClick={handleTakeNote}
            >
                Take Note
            </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
            <CourseNote course={course} onClose={handleCloseModal} />
            </div>
        )}
    </div>
  )
}

export default CourseInfo