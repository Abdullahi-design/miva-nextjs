"use client";

import Form from "@components/Form";
import AuthBtn from "@components/ui/AuthBtn";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const {data: session} = useSession();

  const [submitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    courseCode: "",
    courseName: "",
    videos: "",
    quiz: [],
  });

    const handleChange = (e) => {
      setFormData({
      ...formData,
      [e.target.name]: e.target.value,
      });
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        // Make a POST request to the API route
        const response = await fetch('/api/courses/new', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        // Check if the request was successful (status code 2xx)
        if (response.ok) {
          const data = await response.json();
          console.log('Course created successfully:', data);
          // You can redirect or perform other actions here
        } else {
          // Handle the error response
          const errorData = await response.json();
          console.error('Failed to create a new course:', errorData);
          // You can display an error message or perform other actions here
        }
      } catch (error) {
        console.error('Error creating a new course:', error);
        // Handle network or other errors here
      } finally {
        setIsSubmitting(false);
      }
  };

  return (
    <>
    {session ? (
      <Form
        type='Create'
        desc='create a student course'
        formData={formData}
        setFormData={setFormData}
        handleChange={handleChange}
        submitting={submitting}
        handleSubmit={handleSubmit}
      />
      ):(
        <div className="mx-auto text-center justify-center my-32">
          <h1 className="font-bold text-3xl my-4">Signin to continue</h1>
          <AuthBtn/>
        </div>
      )}
    </>
  );
}
