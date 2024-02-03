"use client";

import React, { useState } from 'react'
import { CldUploadButton } from 'next-cloudinary';

import Link from 'next/link';

const Form = ({ type, desc, formData, setFormData, submitting, handleChange, handleSubmit }) => {
    
  const [imageId, setImageId] = useState("");

    const handleQuizChange = (e) => {
        const quizData = e.target.value.split(',').map((question) => {
            const [text, option1, option2, correctAnswer] = question.split('|');
            return { text, options: [option1, option2], correctAnswer };
        });
    
        setFormData({ ...formData, quiz: quizData });
    };    

    console.log(imageId, '*************');

  return (
    <section className='w-full max-w-full flex-start flex-col'>
        <h1 className='head_text text-left'>
            <span className='blue_gradient'>{type} Student Courses</span>
        </h1>
        <p className='desc text-left max-w-md'>
            {desc}
        </p>
        <form 
        onSubmit={handleSubmit}
        className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'
        >
            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                Course Code{" "}
                </span>
                <input
                    type="text"
                    name="courseCode"
                    value={formData.courseCode}
                    // onChange={handleChange}
                    onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                    required
                    placeholder='Course Code'
                    className='form_input'
                />
            </label>

            <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                Course Title{" "}
                </span>
                <input
                    type="text"
                    name="courseName"
                    value={formData.courseName}
                    // onChange={handleChange}
                    onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                    required
                    placeholder='Course Name'
                    className='form_input'
                />
            </label>

            <label className="flex flex-col w-full items-center justify-center mx-auto border-2 border-gray-600 p-4">
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Upload Course Video {" "}
                </span>

                <CldUploadButton 
                uploadPreset="miva-test" 
                onUpload={(result) =>{
                    setImageId(result?.info?.secure_url);
                    setFormData({
                        ...formData,
                        videos: result?.info?.secure_url,
                    });
                }}
                />


                {imageId && (
                    <div className="rounded-lg overflow-hidden w-[20rem] h-[20rem] relative">
                        <video  
                        className="object-cover" 
                        autoPlay loop muted controls
                        >
                        <source src={imageId} type='video/mp4' />
                        Your browser does not support the video tag.
                        </video>
                    </div>
                )}
            </label>

            <label>
                Quiz:
                <textarea
                    value={formData.quiz.map((q) => `${q.text}|${q.options[0]}|${q.options[1]}|${q.correctAnswer}`).join(',')}
                    onChange={handleQuizChange}
                    required
                    placeholder="Enter quiz questions separated by commas, with options separated by '|', and correct answer separated by '|', Example: 'What does the acronym 'HTTP' stand for?|Hypertext Transfer Protocol|Hypertext Transfer Process|Hypertext Technical Process' "
                    className="form_textarea"
                />
            </label>

            <div className='flex-end mx-3 mb-5 gap-4'>
                <Link href='/' className='text-gray-500 text-sm px-5 py-1 rounded-full hover:border-2 hover:border-primary-orange'>
                    Cancel
                </Link>

                <button
                    type='submit'
                    disabled={submitting}
                    className='px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white'
                >
                    {submitting ? `${type}ing...` : type}
                </button>
            </div>
        </form>
    </section>
  )
}

export default Form