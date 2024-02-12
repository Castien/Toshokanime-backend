const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/authRoutes');

const app = express();

// connecting Mongoose to DB
mongoose.connect('mongodb+srv://Castien:TemporaryPW@mongopractice.lcbf0fe.mongodb.net/toshokanime', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// middleware
app.use(express.json());
app.use(session({
  secret: 'b0ssm@n',
  resave: false,
  saveUninitialized: false
}));

// using user routes
app.use('/api', userRoutes);
app.use('/api', authRoutes);

app.get('/', (req, res) => {
  res.send('Over 9000!');
});

module.exports = app;
