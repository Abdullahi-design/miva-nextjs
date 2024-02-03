import CourseInfo from "@components/CourseInfo";

export async function generateStaticParams() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/courses`);
    if (!res.ok || !res.headers.get('content-type')?.includes('application/json')) {
      throw new Error(`Failed to fetch courses. Invalid response: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();
  
    if (!Array.isArray(data)) {
      throw new Error('Invalid data format received');
    }

    return data.map((course) => ({
      id: course._id.toString(),
    }));
  } catch (error) {
    console.error('Error in generateStaticParams:', error);
    return [];
  }
}

export async function getCourse(id) {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_URL}/api/courses/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch course: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error in getCourse:', error);
    return null; // Return a default value or handle the error accordingly
  }
}

export default async function Page({ params }) {
  const course = await getCourse(params.id);
  console.log(params, course, 'here');

  if (!course) {
    // Handle the case when the course is not available
    return <div>Course not found</div>;
  }

  return (
    <CourseInfo 
      key={course._id}
      course={course}
    />
  );
}