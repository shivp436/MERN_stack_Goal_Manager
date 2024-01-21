// Path: backend/models/userModel.js

const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please enter a username'],
        },
        password: {
            type: String,
            required: [true, 'Please enter a password'],
        },
        email: {
            type: String,
            required: [true, 'Please enter an email'],
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('User', userSchema);