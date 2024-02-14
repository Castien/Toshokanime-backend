import express from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.js";
import verifyToken from "../middlewares/verifyToken.js";

const authRoutes = express.Router();

authRoutes.post("/signup", async (req, res) => {
  const { username, email, password, passwordKey } = req.body;
  
  try {
    // Check if user already exists in the database
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ msg: "User already exists!" });
    }

    let isAdmin = false;
    // Check if the passwordKey matches the admin password
    if (passwordKey === process.env.ADMIN_PASSWORD) {
      isAdmin = true;
    }

    // Create new user
    const user = await User.create({ 
      username, 
      email, 
      password,
      isAdmin,
    });

    // Create a new token
    const token = jwt.sign({ user }, process.env.SECRET, {
      expiresIn: "24h",
    });

    // Respond with the token
    res.status(201).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

/**
 * POST /login
 */
authRoutes.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    // find user by email
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    // check password
    const passwordMatched = password === user.password;
    if (!passwordMatched) {
      return res.status(401).json({ msg: 'Invalid username or password' });
    }

    // create a new token and add user as payload
    const token = jwt.sign({ user }, process.env.SECRET, {
      expiresIn: "24h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      // secure: true,
      // maxAge: 1000000,
      // signed: true;
    });

    // respond with success message
    res.status(201).json(token)({ message: 'Logged in successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }

  return res.redirect("/index");
});

/**
 * POST /change-password
 */
authRoutes.post("/change-password", verifyToken, async (req, res) => {
  console.log(req.user);
  res.send("Token verified!");
});

/**
 * POST /logout
 * Logout a user by clearing the JWT token from the client-side storage.
 */
authRoutes.post('/logout', (req, res) => {

  // Clear the JWT token from client-side storage

  // using cookies:
  res.clearCookie('jwtToken');

  // using local storage:
  // localStorage.removeItem('jwtToken');

  // Respond with a success message or any other relevant response
  res.status(200).json({ message: 'Logged out successfully' });
});

export default authRoutes;