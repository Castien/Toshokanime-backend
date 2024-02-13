import express from 'express';
import User from '../models/user.js';

const authRoutes = express.Router();

authRoutes.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Compare plaintext passwords
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    // Setting session
    req.session.user = { username };
    res.status(200).json({ message: 'Logged in successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

authRoutes.post('/logout', (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: 'Logged out successfully' });
});

export default authRoutes;
