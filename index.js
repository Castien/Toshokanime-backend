import mongoose from 'mongoose';
import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import { useNavigate } from 'react-router-dom';

import mongoConn from './db/conn.js';
import './loadEnv.js';

const app = express();
const port = process.env.PORT || 9001;

// Connect to MongoDB
mongoConn()
  .then(() => {
    // Middleware
    app.use(cors({
      origin: 'http://localhost:3000',
      optionsSuccessStatus: 200
    }));

    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(morgan('dev'));

    // Define Mongoose schema
    const User = mongoose.model('User', {
      username: String,
      email: String,
      password: String,
      isAdmin: Boolean
    });

    // API routes
    app.post('/api/register', async (req, res) => {
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

    app.post('/api/login', async (req, res) => {
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

    // Start server
    app.listen(port, () => console.log(`Server is running on port ${port}`));
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });
