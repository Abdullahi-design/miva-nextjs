"use client";

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { FiX } from 'react-icons/fi';

const CourseNote = ({course, onClose}) => {
    const {data: session} = useSession();
    const router = useRouter();
    const courseId = course?._id;
    const userId = session?.user.id

    const [submitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({ note: [] });

    const handleChange = (e) => {
        setFormData({
        ...formData,
        note: e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
  
        try {
          // Make a POST request to the API route
          const response = await fetch(`/api/courses/note/${courseId}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, courseId, note: formData.note }),
          });
  
          // Check if the request was successful (status code 2xx)
          if (response.ok) {
            const data = await response.json();
            console.log('Course Note created successfully:', data);
            // You can redirect or perform other actions here
          } else {
            // Handle the error response
            const errorData = await response.json();
            console.error('Failed to create a new course note:', errorData);
            // You can display an error message or perform other actions here
          }
        } catch (error) {
          console.error('Error creating a new course note:', error);
          // Handle network or other errors here
        } finally {
          setIsSubmitting(false);
          onClose()
        }
    };

  return (
    <>
        <div 
        onClick={() => onClose()}
        className="fixed inset-0 bg-opacity-5 backdrop-blur-sm bg-black"></div>
        <form
            onSubmit={handleSubmit}
            className='mt-10 md:w-full w-fit max-w-2xl h-fit flex flex-col gap-7 glassmorphism'
        >
            <label>
                <h1 className='text-md md:text-xl text-white text-center font-semibold'>
                    <span>Make Notes</span>
                </h1>
                <span 
                className=' cursor-pointer text-right right-6 top-[2rem] absolute text-white'
                onClick={() => onClose()}
                >
                    <FiX className='w-4 h-4' />
                </span>
                
                <textarea
                    value={formData.note}
                    onChange={handleChange}
                    required
                    placeholder='Write a short note'
                    className="form_textarea"
                />
            </label>
            <button
                type='submit'
                disabled={submitting}
                className='md:py-3 py-1.5 md:px-5 px-3 text-sm bg-primary-orange rounded-md text-white'
            >
                {submitting ? `Adding...` : 'Add'}
            </button>
        </form>
    </>
  )
}

export default CourseNote