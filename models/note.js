import { Schema, model, models } from 'mongoose';

const NoteSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    courseId: {
        type: Schema.Types.ObjectId,
        ref: 'courseId',
    },
    note: [{
        type: String,
    }],
});

const Note = models.Note || model('Note', NoteSchema);

export default Note;
