
import Courses from "@models/courses";
import Note from "@models/note";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
    try {
        await connectToDB()

        const course = await Courses.findById(params.id)
        if (!course) {
            return new Response(JSON.stringify({ error: "Course not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
        }

        return new Response(JSON.stringify(course), { status: 200 })

    } catch (error) {
        return new Response("Internal Server Error", { status: 500 });
    }
}