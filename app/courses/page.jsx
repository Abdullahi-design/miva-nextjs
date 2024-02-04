"use client";

import CourseCard from '@components/CourseCard';
import AuthBtn from '@components/ui/AuthBtn';
import { CourseCardSkeleton } from '@components/ui/CourseCardSkeleton';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Course = () => {
  const {data: session} = useSession();

    const router = useRouter()
    const [allCourses, setAllCourses] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const handleCourseDetailsClick = (course) => {

        router.push(`/course/${course._id}`);
    };

    const fetchCourses = async () => {
        try {
        const response = await fetch("/api/courses");
        if (response.ok) {
            const data = await response.json();
            setAllCourses(data);
            console.log(data, 'data');
        } else {
            console.error('Failed to fetch courses:', response.statusText);
        }
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setIsLoading(false)
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);
    
  return (
    <>
        {session ? (
            <div>
                <h1 className="head_text text-left">
                    <span className='blue_gradient'>Course List</span>
                </h1>
                <div>
                    {isLoading ? (
                        <CourseCardSkeleton />
                    ) : (
                        allCourses.map((course) => (
                            <CourseCard 
                                key={course._id} 
                                course={course}
                                handleCourseDetailsClick={handleCourseDetailsClick}
                            />
                        ))
                    )}
                </div>
            </div>
        ):(
            <div>
            <h1 className="font-bold text-3xl my-32">Signin to continue</h1>
            <AuthBtn/>
            </div>
        )}
    </>
  );
};

export default Course;
