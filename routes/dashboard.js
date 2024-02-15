// routes/dashboard.js
const express = require('express');
const dashboardRoutes = express.Router();
const User = require('./users');
const Media = require('./media');

// Main Library Route
dashboardRoutes.get('/main-library', async (req, res) => {
  try {
    const allMedia = await Media.find();
    res.json(allMedia);
  } catch (error) {
    console.error('Error fetching media data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Admin Dashboard Route
dashboardRoutes.get('/admindash/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const adminProfile = await User.findOne({ username });
    if (!adminProfile) {
      return res.status(404).json({ error: 'Admin profile not found' });
    }
    res.json(adminProfile);
  } catch (error) {
    console.error('Error fetching admin profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// User Dashboard Route
dashboardRoutes.get('/userdash/:username', async (req, res) => {
  try {
    const { username } = req.params;
    const userProfile = await User.findOne({ username });
    if (!userProfile) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = dashboardRoutes;
