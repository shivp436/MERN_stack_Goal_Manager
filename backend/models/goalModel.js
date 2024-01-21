// Path: backend/models/goalModel.js

const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        // , description: {
        //     type: String,
        // },
        // targetDate: {
        //     type: Date,
        //     required: true,
        // },
        // isCompleted: {
        //     type: Boolean,
        //     required: true,
        //     default: false,
        // },
        // completedDate: {
        //     type: Date,
        // },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('Goal', goalSchema);