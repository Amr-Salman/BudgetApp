const dotenv = require('dotenv').config();
const cors = require('cors');
const express = require('express');
const userRoutes = require('./routes/userRoutes');
const budgetRoutes = require('./routes/budgetRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const { errorHandler, notFound } = require('./middlewares/errorHandler');
const authMiddleware = require('./middlewares/authMiddleware');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

// Initialize the App
const app = express();

// Listening to requests
const PORT = process.env.PORT || 8000;
mongoose
  .connect(process.env.MONGO_URI)
  .then((res) => {
    // listenning to the server after mongoose connect
    app.listen(PORT, () => {
      console.log(`Server is up and listening on port: ${PORT}!!`);
    });
  })
  .catch((err) => {
    console.log(err);
  });

/* Middlewares */

// Accepting data in the req.body
app.use(
  cors({
    origin: ['http://localhost:5173'],
    credentials: true,
  })
);
app.use(cookieParser()); // For parsing cookies
app.use(express.json()); // For parsing json
app.use(express.urlencoded({ extended: false })); // For parsing html forms data

/* Routes */
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/budget', authMiddleware, budgetRoutes);
app.use('/api/v1/expense', authMiddleware, expenseRoutes);

// Error handler middleware
// Error handler middleware should be at the end
app.use(notFound); // For not found routes because the default is html page
app.use(errorHandler); // Custom general error handler
