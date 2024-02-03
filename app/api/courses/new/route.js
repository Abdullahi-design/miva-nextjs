import Courses from "@models/courses";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {

    // Destructure data from the request body
    const { courseCode, courseName, videos, note, quiz } = await request.json();

    try {
        // console.log(name, videos, note, quiz);
        // Connect to the database
        await connectToDB();

        // Create a new course instance
        const newCourse = new Courses({
            courseCode,
            courseName,
            videos,
            note,
            quiz,
        });

      // Save the course to the database
      const savedCourse = await newCourse.save();
      
      return new Response(JSON.stringify(savedCourse), { status: 200 });

    } catch (error) {
      console.error("Error creating a new course:", error);

        // Check for validation errors
        if (error.name === 'ValidationError') {
            res.status(400).json({ error: `Validation error: ${error.message}` });
        } else {
            // Return a generic error response
            res.status(500).json({ error: "Failed to create a new course" });
        }
    }
}
