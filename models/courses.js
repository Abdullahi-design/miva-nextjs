import { Schema, model, models } from 'mongoose';

const CoursesSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name of Courses are required.'],
    },
    videos: {
        type: String,
        required: [true, 'videos are required.'],
    },
    note: {
        type: String,
        // required: [true, 'note is required.'],
    },
    quiz: [{
        text: String,
        options: [String],
        correctAnswer: String,
    }],
});

const Courses = models.Courses || model('Courses', CoursesSchema);

export default Courses;
