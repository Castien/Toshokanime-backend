// import '../loadEnv.js'; 
// import express from 'express';
// import morgan from 'morgan';
// import cors from 'cors';
// import mongoConn from '../db/conn.js';
// import cookieParser from 'cookie-parser';
// import userRoutes from '../routes/users.js';
// import authRoutes from './routes/auth.js';
// import adminRoutes from './routes/admin.js'; // Add adminRoutes import

// mongoConn();
// const app = express();
// const port = process.env.PORT || 9001;

// //CORS config
// app.use(cors({
//   origin: 'http://localhost:3000',
//   optionsSuccessStatus: 200
// }));

// // // Manual CORS configuration
// // app.use((req, res, next) => {
// //   console.log('Setting CORS headers...');
// //   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
// //   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
// //   res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// //   next();
// // });

// // Other middleware
// app.use(morgan('dev')); // logger
// app.use(express.json()); // for data in req.body
// app.use(express.urlencoded({ extended: true })); // allow data in url string
// app.use(cookieParser());

// // HTTP routes
// app.use('/api', userRoutes);
// app.use('/api', authRoutes);
// app.use('/api', adminRoutes); // Mount adminRoutes under /api

// // Root route
// app.get('/', (req, res) => {
//   res.send('Over 9000!');
// });

// app.post('/', (req, res) => {
//   res.send('Done did a thing.');
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server listening at http://localhost:${port}`);
// });
