
import Note from "@models/note";
import { connectToDB } from "@utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const courses = await Note.find({})

        return new Response(JSON.stringify(courses), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all courses", { status: 500 })
    }
} 

export const POST = async (request) => {
    const { userId, courseId, note } = await request.json();

    try {
        const newNote = new Note ({ 
            creator: userId, 
            courseId,
            note 
        })
        await connectToDB();

        const saveNote = await newNote.save();
        return new Response(JSON.stringify(saveNote), { status: 200 });
    } catch (error) {
        return new Response("Error Updating Course", { status: 500 });
    }
};

export const PATCH = async (request, { params }) => {
    const { note } = await request.json();

    try {
        // const course = new Courses ({ note })
        console.log(note, 'here');
        await connectToDB();

        // Find the existing note by ID
        const existingNote = await Note.findById(params.id);

        if (!existingNote) {
            return new Response(JSON.stringify({ error: "Course not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
        }

        // Update the note with new data
        existingNote.note = note;

        await existingNote.save();

        return new Response("Successfully updated the Course", { status: 200 });
    } catch (error) {
        return new Response("Error Updating Course", { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    try {
        await connectToDB();
    
        // Find the note by ID and remove it
        const removeNote = await Note.findOneAndDelete({ _id: params.id });
    
        if (!removeNote) {
            return new Response(JSON.stringify({ error: "Course not found" }), { status: 404, headers: { "Content-Type": "application/json" } });
        }
    
        return new Response("Course deleted successfully", { status: 200 });
    } catch (error) {
      console.error(error);
      return new Response("Error deleting note", { status: 500 });
    }
};