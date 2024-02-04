import { Schema, model, models } from 'mongoose';

const CoursesSchema = new Schema({
    courseCode: {
        type: String,
        required: [true, 'course code is required.'],
    },
    courseName: {
        type: String,
        required: [true, 'course name is required.'],
    },
    videos: {
        type: String,
        required: [true, 'videos are required.'],
    },
    // note: [{
    //     type: String,
    // }],
    quiz: [{
        text: String,
        options: [String],
        correctAnswer: String,
    }],
});

const Courses = models.Courses || model('Courses', CoursesSchema);

export default Courses;
