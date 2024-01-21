// Path: backend/controllers/goalController.js
const asyncHandler = require('express-async-handler');
const Goal = require('../models/goalModel');
const User = require('../models/userModel');

// @desc    Get all goals
// @route   GET /api/goals
// @access  Private
const getGoals = asyncHandler(async (req, res) => {
    const goals = await Goal.find({ user: req.user._id});

    res.status(200).json(goals);
});

// @desc    set new goal
// @route   POST /api/goals
// @access  Private
const setGoal = asyncHandler(async (req, res) => {
    console.log(req.body);

    if (!req.body.name) {
        res.status(400);
        throw new Error('Please add a name field');
    }

    const goal = await Goal.create({
        name: req.body.name,
        user: req.user._id,
    });

    // const goal = new Goal({
    //     name: req.body.name,
    // });
    // using new will not create auto timestamps

    res.status(200).json(goal);
});

// @desc    update goal
// @route   PUT /api/goals/:id
// @access  Private
const updateGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }

    if (goal.user.toString() !== user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized');
    }

    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    });

    res.status(200).json(updatedGoal);
});

// @desc    delete goal
// @route   DELETE /api/goals/:id
// @access  Private
const deleteGoal = asyncHandler(async (req, res) => {
    const goal = await Goal.findById(req.params.id);

    if (!goal) {
        res.status(400);
        throw new Error('Goal not found');
    }

    const user = await User.findById(req.user._id);

    if (!user) {
        res.status(400);
        throw new Error('User not found');
    }

    if (goal.user.toString() !== user._id.toString()) {
        res.status(401);
        throw new Error('User not authorized');
    }

    try {
        await Goal.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: `Deleted goal ${req.params.id}` });
    } catch (error) {
        res.status(500);
        throw new Error('Error deleting goal');
    }
});

module.exports = {
    getGoals,
    setGoal,
    updateGoal,
    deleteGoal,
};
