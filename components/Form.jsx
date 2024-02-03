"use client";

import React, { useState } from 'react'
import { MdOutlineFileUpload } from "react-icons/md";
import { displayMedia } from './displayMedia';
import Link from 'next/link';

const Form = ({ type, desc, formData, setFormData, submitting, handleChange, handleSubmit }) => {
    
  const [file, setFile] = useState(undefined);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setFile(file)
        if (file) {
        // Read the selected image file and convert it to a data URL
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData({
            ...formData,
            videos: reader.result,
            imagePreview: reader.result,
            });
        };
        reader.readAsDataURL(file);
        }
    };  

    const handleQuizChange = (e) => {
        const quizData = e.target.value.split(',').map((question) => {
            const [text, option1, option2, correctAnswer] = question.split('|');
            return { text, options: [option1, option2], correctAnswer };
        });
    
        setFormData({ ...formData, quiz: quizData });
    };    

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
                Course Title{" "}
                </span>
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    // onChange={handleChange}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder='Course Name'
                    className='form_input'
                />
            </label>

            <label className="flex flex-col w-full items-center justify-center mx-auto border-2 border-gray-600 p-4">
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Upload Course Video {" "}
                </span>
                {
                    formData.videos ? 
                    (
                    null
                    ):(
                    <span className="text-center py-2 text-sm text-gray-500">Video should be of good quility.</span>
                    )
                }
                <input
                    type="file"
                    // value={formData.videos}
                    // onChange={handleChange}
                    onChange={(e) => handleImageChange(e)}
                    accept="image/jpeg, image/png, image/webp, image/gif, video/mp4, video/webm"
                    required
                    className='hidden'
                    id='videosInput'
                />
                <label
                    htmlFor='videosInput'
                    className='flex w-fit cursor-pointer bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 ease-in-out hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800'
                >
                    <span className="">
                    <MdOutlineFileUpload className="w-6 h-6"/>
                    </span>
                    Upload Video
                </label>
                {formData.videos && file && (
                    <div className="flex gap-4 mt-2 items-center">
                        {displayMedia(formData)}
                        <button
                            type="button"
                            className="border rounded-xl px-4 py-2"
                            onClick={() => {
                            setFile(undefined)
                            }}
                        >
                            remove
                        </button>
                    </div>
                )}
            </label>

            {/* <label>
                <span className='font-satoshi font-semibold text-base text-gray-700'>
                    Your Prodcut description
                </span>

                <textarea
                    value={formData.note}
                    // onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    onChange={handleChange}
                    placeholder='Write your note here'
                    required
                    className='form_textarea '
                />
            </label> */}

            <label>
                Quiz:
                <textarea
                    value={formData.quiz.map((q) => `${q.text}|${q.options[0]}|${q.options[1]}|${q.correctAnswer}`).join(',')}
                    onChange={handleQuizChange}
                    required
                    placeholder="Enter quiz questions separated by commas, with options separated by '|', and correct answer separated by '|', Example: 'Which planet is known as the Red Planet?|Mars|Venus|Mars' "
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