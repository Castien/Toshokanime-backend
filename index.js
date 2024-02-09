// setting up Express.js server
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');

const app = express();
const port = 9001;

app.get('/', (req, res) => {
  res.send('Over 9000!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

// connecting Mongoose to DB
mongoose.connect('mongodb+srv://Castien:TemporaryPW@mongopractice.lcbf0fe.mongodb.net/toshokanime', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('Error connecting to MongoDB:', err));

// middleware
app.use(express.json());

// using user routes
app.use('/api', userRoutes);



