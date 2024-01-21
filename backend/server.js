// Path: backend/server.js

const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
dotenv.config();
const PORT = process.env.PORT || 5000;
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

connectDB();
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/goals', require('./routes/goalRoutes'));
app.use(errorHandler); // Error handler middleware - should be after routes

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
