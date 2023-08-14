const mongoose = require('mongoose');
const { Schema } = mongoose;

const studentSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    gradeLevel: { type: String },
    subjectsOfInterest: [{ type: String }],
});

const StudentModel = mongoose.model('Student', studentSchema);
module.exports = StudentModel;

