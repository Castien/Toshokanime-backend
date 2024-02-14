import express from 'express';
import User from '../models/user.js';

const router = express.Router();

// Create a new user
router.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get all users
router.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get a user by username
router.get('/api/user/:username', async (req, res) => {
    try {
      const username = req.params.username;
      // Query the database to find the user by their username
      const user = await User.findOne({ username });
      if (user) {
        // User found, send user data as response
        res.json(user);
      } else {
        // If user is not found, return a 404 status
        res.status(404).json({ error: 'User not found' });
      }
    } catch (error) {
      // Handle errors appropriately
      console.error('Error fetching user by username:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

// Update a user by ID
router.put('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(userId, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a user by ID
router.delete('/users/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// API routes
router.post('/api/register', async (req, res) => {
  const { username, email, password, adminKey } = req.body;
  const isAdmin = (adminKey === process.env.ADMIN_KEY);

  const newUser = new User({
    username,
    email,
    password,
    isAdmin
  });

  try {
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/api/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username, password });
    if (user) {
      let isAdmin = user.isAdmin;
      res.status(200).json({ message: 'Login successful', isAdmin }); // Include isAdmin in response
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

router.post('/api/user/:userId/profile', async (req, res) => {
  const userId = req.params.userId;
  const profileData = req.body; // Assuming req.body contains the updated profile data

  try {
    // Update the user's profile data in the database
    await User.findByIdAndUpdate(userId, profileData);
    res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error updating user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

export default router;
