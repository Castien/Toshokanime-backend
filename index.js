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
import mongoConn from './db/conn.js';
import cookieParser from 'cookie-parser';
import userRoutes from './routes/users.js';
import authRoutes from './routes/auth.js';
import verifyToken from './middlewares/verifyToken.js';
// import adminRoutes from './routes/admin.js';

mongoConn();
const app = express();
const port = process.env.PORT || 9001;

// Middleware

// allows requests from frontend domain (running on port 3000)
// to connect to backend
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions)); 
app.use(morgan('dev')); // logger
app.use(express.json()); // for data in req.body
app.use(express.urlencoded({ extended: true })); // allow data in url string
app.use(cookieParser());
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
