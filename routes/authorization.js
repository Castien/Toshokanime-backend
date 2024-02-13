// import express from 'express';
// import User from '../models/user.js';

// const authRoutes = express.Router();

// /**
//  * POST /login
//  */
// authRoutes.post('/login', async (req, res) => {
//   const { username, password } = req.body;
//   try {
//     // Find user by username
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Compare passwords
//     if (user.password !== password) {
//       return res.status(401).json({ message: 'Invalid username or password' });
//     }

//     // Setting session to verify user/admin status
//     req.session.user = {
//       username,
//       isAdmin: user.isAdmin
//     };

//     // Log session data for debugging
//     console.log('User session data:', req.session.user);

//     // Respond with success message
//     res.status(200).json({ message: 'Logged in successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// /**
//  * POST /logout
//  */
// authRoutes.post('/logout', (req, res) => {
//   // Destroy session on logout
//   req.session.destroy();
//   res.status(200).json({ message: 'Logged out successfully' });
// });

// export default authRoutes;
