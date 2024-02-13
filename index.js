//index.js should have:
// - server port infomation
// - middleware
// - http routes

import './loadEnv.js'; 
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import session from 'express-session';
import userRoutes from './routes/users.js';
import authRoutes from './routes/authorization.js';


const app = express();
const port = process.env.PORT || 9001;

// Middleware
app.use(cors()); // allows frontend to connect to backend
app.use(morgan('dev')); // logger
app.use(express.json()); // for data in req.body
app.use(express.urlencoded({extended: true})); // allow data in url string

// Middleware for Authentication
app.use(express.json());
app.use(session({
  secret: 'b0ssm@n',
  resave: false,
  saveUninitialized: false
}));

// HTTP routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Over 9000!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
