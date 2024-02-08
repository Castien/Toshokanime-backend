const express = require('express');
const app = express();
const port = 9001;

app.get('/', (req, res) => {
  res.send('Over 9000!');
});

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});

const mongoose = require('mongoose');

mongoose.connect('URL', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));
