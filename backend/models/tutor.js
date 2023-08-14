const mongoose = require('mongoose');
const { Schema } = mongoose;

const tutorSchema = new Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    subjectsTaught: [{ type: String }],
    rates: { type: Number },
    areaOfOperation: { type: String },
});

const TutorModel = mongoose.model('Tutor', tutorSchema);
module.exports = TutorModel;