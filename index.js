require('dotenv').config();
const cors = require('cors');
const express = require('express');
const connectDB = require('./db/connectDB.js');
const userRoutes = require('./routes/users.js');
const mediaRoutes = require('./routes/media.js');
const dashboardRoutes = require('./routes/dashboard.js'); // Import dashboard routes

const app = express();
const port = process.env.PORT || 9001;

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', mediaRoutes);
app.use('/api', dashboardRoutes); // Mount the dashboard routes

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
