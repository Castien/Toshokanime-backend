import express from 'express';
import User from '../models/user';

const adminRoutes = express.Router();

/**
 * GET /profile
 * checks if the user stored in the session is an admin
 * responds with a success message and the admin's username
 * else responds with an unauthorized message
 */
adminRoutes.get('/user', (req, res) => {
  if (req.session.user && req.session.user.isAdmin) {
    res.status(200).json({ message: 'Authorized', username: req.session.user.username });
    console.log('Session data:', req.session);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

/**
 * Update user admin status:
 * verifies authenticated user is an admin
 * else it returns a forbidden error
 * finds the user by ID, updates their status to admin
 * responds with a success message
 */
adminRoutes.put('/users/:id/admin', async (req, res) => {
  const { id } = req.params;
  
  try {
    // Check if the authenticated user is an admin
    if (!req.session.user || !req.session.user.isAdmin) {
      return res.status(403).json({ message: 'Only admins can perform this action' });
    }
    
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Assigns user status to admin
    user.isAdmin = true;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: 'User updated to admin status successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// // Authentication
// adminRoutes.post('/login', async (req, res) => {
//     // Implementation for admin login
// });

// adminRoutes.post('/logout', async (req, res) => {
//     // Implementation for admin logout
// });

// // Profile Management
// adminRoutes.get('/profile', async (req, res) => {
//     // Implementation for getting admin's profile information
// });

// adminRoutes.put('/profile', async (req, res) => {
//     // Implementation for updating admin's publicly viewable profile
// });

// adminRoutes.patch('/profile', async (req, res) => {
//     // Implementation for updating admin's non-publicly viewable email and password
// });

// // User Management
// adminRoutes.post('/users', async (req, res) => {
//     // Implementation for creating a new user account
// });

// adminRoutes.get('/users', async (req, res) => {
//     // Implementation for getting a list of all users
// });

// adminRoutes.get('/users/:id', async (req, res) => {
//     // Implementation for getting details of a specific user
// });

// adminRoutes.put('/users/:id', async (req, res) => {
//     // Implementation for updating a user's information
// });

// adminRoutes.delete('/users/:id', async (req, res) => {
//     // Implementation for deleting a user account
// });

// // Main Library Management
// adminRoutes.post('/main-library', async (req, res) => {
//     // Implementation for creating a new main library entry
// });

// adminRoutes.get('/main-library', async (req, res) => {
//     // Implementation for getting a list of all main library entries
// });

// adminRoutes.get('/main-library/:id', async (req, res) => {
//     // Implementation for getting details of a specific main library entry
// });

// adminRoutes.put('/main-library/:id', async (req, res) => {
//     // Implementation for updating a main library entry
// });

// adminRoutes.delete('/main-library/:id', async (req, res) => {
//     // Implementation for deleting a main library entry
// });

// // User Submission Management
// adminRoutes.get('/submissions', async (req, res) => {
//     // Implementation for getting a list of all user submissions
// });

// adminRoutes.get('/submissions/:id', async (req, res) => {
//     // Implementation for getting details of a specific user submission
// });

// adminRoutes.put('/submissions/:id/approve', async (req, res) => {
//     // Implementation for approving a user submission
// });

// adminRoutes.put('/submissions/:id/reject', async (req, res) => {
//     // Implementation for rejecting a user submission
// });

export default adminRoutes;
