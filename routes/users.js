require("dotenv").config(); // Load environment variables from .env file
const express = require("express");
const User = require("../models/user.js"); // Correct the path to the User model

const userRoutes = express.Router();

// Error handling middleware
const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: "Internal Server Error" });
};

// Get all users
userRoutes.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    handleError(res, error);
  }
});

// Get a user by username
userRoutes.get('/users/:username', async (req, res) => {
  try {
    const username = req.params.username;
    const user = await User.findOne({ username });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    handleError(res, error);
  }
});

// Create a new user
userRoutes.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    handleError(res, error);
  }
});

// Update a user by ID
userRoutes.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    handleError(res, error);
  }
});

// Delete a user by ID
userRoutes.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    handleError(res, error);
  }
});

userRoutes.post("/register", async (req, res) => {
  const { username, email, password, adminKey } = req.body;
  const isAdmin = adminKey === process.env.ADMIN_KEY;

  try {
    // Check if username or email already exists
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "Username or email already exists" });
    }

    // Create a new user
    const newUser = new User({
      username,
      email,
      password,
      isAdmin,
    });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    handleError(res, error);
  }
});

userRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      let isAdmin = user.isAdmin; // Assuming isAdmin is a field in your User schema
      res.status(200).json({ message: 'Login successful', isAdmin });
  } else {
      res.status(401).json({ error: 'Invalid credentials' });
  }
} catch (error) {
  res.status(500).json({ error: 'An error occurred' });
}
});

userRoutes.post('/api/users/:userId/profile', async (req, res) => {
  const userId = req.params.userId;
  const profileData = req.body;

  try {
    await User.findByIdAndUpdate(userId, profileData);
    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    handleError(res, error);
  }
});

module.exports = userRoutes;
