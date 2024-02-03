import Courses from "@models/courses";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const courses = await Courses.find({}).limit(6)

        return new Response(JSON.stringify(courses), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all courses", { status: 500 })
    }
} 