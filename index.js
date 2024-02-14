/**
 * index.js should include:
 * server port handling
 * middleware
 * http routes
 */

import './loadEnv.js'; 
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import verifyToken from './middlewares/verifyToken.js';
// import adminRoutes from './routes/admin.js';


const app = express();
app.use(cookieParser());
const port = process.env.PORT || 9001;

// Middleware
app.use(cors()); // allows frontend to connect to backend
app.use(morgan('dev')); // logger
app.use(express.json()); // for data in req.body
app.use(express.urlencoded({ extended: true })); // allow data in url string

// // Middleware for Authentication
// app.use(session({
//   secret: process.env.SESSION_SECRET || 'default_secret',
//   resave: false,
//   saveUninitialized: false,
//   cookie: { secure: true }
// }));

// HTTP routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);
// app.use('/api', adminRoutes);

app.get('/', (req, res) => {
  res.send('Over 9000!');
});
app.post('/login', authRoutes);
app.post('/signup', verifyToken, authRoutes);

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
