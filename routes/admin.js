import express from 'express';
import User from '../models/user.js';
import verifyToken from '../middlewares/verifyToken.js';

const adminRoutes = express.Router();

// Update user admin status
adminRoutes.put('/users/:id/admin', verifyToken, async (req, res) => {
  const { id } = req.params;
  
  try {
    // Find the user by ID
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Assign user status to admin
    user.isAdmin = true;
    await user.save();

    // Respond with success message
    res.status(200).json({ message: 'User updated to admin status successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// ADMIN USER MANAGEMENT

// Create a new user (admin)
adminRoutes.post('/admin/createUser', verifyToken, async (req, res) => {
    try {
        const newUser = new User(req.body);
        const savedUser = await newUser.save();
        res.status(201).json(savedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Update a user (admin)
adminRoutes.put('/admin/updateUser/:id', verifyToken, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedUser);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a user (admin)
adminRoutes.delete('/admin/deleteUser/:id', verifyToken, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

export default adminRoutes;
