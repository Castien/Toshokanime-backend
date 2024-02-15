require("dotenv").config();
const cors = require("cors");
const express = require("express");
const connectDB = require("./db/connectDB.js");
const userRoutes = require("./routes/users.js");
const mediaRoutes = require("./routes/media.js");

const app = express();
const port = process.env.PORT || 9001;

connectDB();

// Middleware
app.use(cors()); //all routes
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

// Routes
app.use("/api", userRoutes); // Mount userRoutes under /api
app.use("/api", mediaRoutes); // Mount mediaRoutes under /api

// Handle invalid routes
app.use((req, res) => {
  res.status(404).json({ error: "Not Found" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

app.get("/", (req, res) => {
  res.json("Welcome to Toshokanime!");
});

app.get("*", (req, res) => {
  res.sendStatus(404);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
