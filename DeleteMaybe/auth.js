// import express from "express";
// import jwt from "jsonwebtoken";
// import bcrypt from "bcrypt";
// import User from "../models/user.js";
// import verifyToken from "../middlewares/verifyToken.js";

// const authRoutes = express.Router();

// // User signup route
// authRoutes.post("/signup", async (req, res) => {
//   const { username, email, password, passwordKey } = req.body;

//   try {
//     // Check if user already exists in the database
//     const userExist = await User.findOne({ email });
//     if (userExist) {
//       return res.status(400).json({ msg: "User already exists!" });
//     }

//     let isAdmin = false;
//     // Check if the passwordKey matches the admin password
//     if (passwordKey === process.env.ADMIN_PASSWORD) {
//       isAdmin = true;
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new user
//     const user = await User.create({
//       username,
//       email,
//       password: hashedPassword,
//       isAdmin,
//     });

//     // Return user details instead of just token
//     const { _id, username: userUsername, isAdmin: userIsAdmin } = user;
//     res.status(201).json({ user: { _id, username: userUsername, isAdmin: userIsAdmin } });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // User login route
// authRoutes.post("/login", async (req, res) => {
//   const { username, password } = req.body;

//   try {
//     // Find user by username
//     const user = await User.findOne({ username });
//     if (!user) {
//       return res.status(401).json({ msg: 'Invalid username or password' });
//     }

//     // Check password
//     const passwordMatched = await bcrypt.compare(password, user.password);
//     if (!passwordMatched) {
//       return res.status(401).json({ msg: 'Invalid username or password' });
//     }

//     // Create a new token
//     const token = jwt.sign({ user }, process.env.SECRET, {
//       expiresIn: "24h",
//     });

//     // Set the token as a cookie
//     res.cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production', // Enable in production
//     });

//     // Return token and user details
//     const { _id, username: userUsername, isAdmin: userIsAdmin } = user;
//     res.status(200).json({ token, user: { _id, username: userUsername, isAdmin: userIsAdmin }, message: 'Logged in successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// });

// // Change password route (requires authentication)
// authRoutes.post("/change-password", verifyToken, async (req, res) => {
//   console.log(req.user);
//   res.send("Token verified!");
// });

// // User logout route
// authRoutes.post('/logout', (req, res) => {
//   // Clear the JWT token from client-side storage
//   res.clearCookie('token');
//   // Respond with a success message or any other relevant response
//   res.status(200).json({ message: 'Logged out successfully' });
// });

// export default authRoutes;
