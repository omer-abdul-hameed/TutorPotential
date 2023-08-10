const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        match: [/\S+@\S+\.\S+/, 'is invalid'], // Simple email validation
        sparse: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true  // This will add the createdAt and updatedAt fields
});

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
