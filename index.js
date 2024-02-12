const app = require('./app');

const port = process.env.PORT || 9001;

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
