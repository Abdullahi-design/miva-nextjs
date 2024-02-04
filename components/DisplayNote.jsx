"use client";

import { useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react'

const DisplayNote = ({course}) => {
  const { data: session } = useSession();
  const courseId = course?._id;
  const loggedInUser = session?.user.id;
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true);

  console.log(courseId, 'courseId');
  const fetchNotes = async () => {
    // e.preventDefault();

    try {
      // Make a POST request to the API route
      const response = await fetch(`/api/courses/note`);

      // Check if the request was successful (status code 2xx)
      if (response.ok) {
        const data = await response.json();
        setNotes(data)
        console.log('Course Note Fetched successfully:', data);
        // You can redirect or perform other actions here
      } else {
        // Handle the error response
        const errorData = await response.json();
        console.error('Failed to fetch course note:', errorData);
        // You can display an error message or perform other actions here
      }
    } catch (error) {
      console.error('Error fetch course note:', error);
      // Handle network or other errors here
    } finally {
      // Set loading to false whether successful or not
      setLoading(false);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      fetchNotes();  // Corrected function name
    }, 5000); // Fetch data every 5 seconds (adjust as needed)

    // Clean up the interval when the component unmounts or when you don't need it anymore
    return () => clearInterval(intervalId);
  }, [session?.user.id]);

  const handleDelete = async (note) => {
    console.log(note);
    const hasConfirmed = confirm(
      "Are you sure you want to delete this note?"
    );

    if (hasConfirmed) {
      try {
        await fetch(`/api/courses/note/${note._id}`, {
          method: "DELETE",
        });

        const filteredProducts = notes.filter((item) => item._id !== note._id);

        setNotes(filteredProducts);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleEdit = async (note) => {
    console.log('hello');
    // e.preventDefault();
    // setIsSubmitting(true);

    // if (!note._id) return alert("Missing note id!");

    // try {
    //   const response = await fetch(`/api/courses/note/${note._id}`, {
    //     method: "PATCH",
    //     body: JSON.stringify({ note: note.productName }),
    //   });

    // } catch (error) {
    //   console.log(error);
    // } finally {
    //   setIsSubmitting(false);
    // }
  };

  return (
    <div className=''>
      {loading ? (
        <p>Fetching Note...</p>
      ) : (
        <>
          <h1 className='head_text text-center my-4'>
            <span className='blue_gradient'>Your Notes</span>
          </h1>
          <div className='grid gap-4 md:grid-cols-3 grid-cols-1'>
            {notes
              .filter((courseNote) => courseNote.courseId === courseId && courseNote.creator === loggedInUser) // Filter notes by courseId
              .map((courseNote) => (
              <div key={courseNote._id} className='border my-4 p-6 mb-4 rounded-md shadow-md'>
                <ul className='list-disc px-2'>
                  {courseNote.note.map((singleNote, index) => (
                    <li key={index}>{singleNote}</li>
                  ))}
                </ul>
  
                <div className='mt-5 flex justify-between gap-4 border-t border-gray-100 pt-3'>
                  <p onClick={() => handleEdit(courseNote)} className='font-inter text-sm green_gradient cursor-pointer'>
                    Edit
                  </p>
                  <p onClick={() => handleDelete(courseNote)} className='font-inter text-sm orange_gradient cursor-pointer'>
                    Delete
                  </p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayNote