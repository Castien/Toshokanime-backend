const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sessionConfig = require('../middleware/sessionConfig');

// Login Route
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username, password });
    if (user) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: sessionConfig.sessionExpiration });
      res.status(200).json({ message: 'Login successful', token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    res.status(500).json({ error: 'An error occurred' });
  }
});

// // Change password route (requires authentication)
// authRoutes.post("/change-password", verifyToken, async (req, res) => {
//   console.log(req.user);
//   res.send("Token verified!");
// });

// User logout route
authRoutes.post('/logout', (req, res) => {
  // Clear the JWT token from client-side storage
  res.clearCookie('token');
  // Respond with a success message or any other relevant response
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;
