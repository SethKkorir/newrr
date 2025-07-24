const express = require('express');
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorMiddleware');
const colors = require('colors');
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());



app.use('/api/goals', require('./routes/goalRoutes'));
// Error handling middleware
app.use(errorHandler);
// Connect to MongoDB
connectDB();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
