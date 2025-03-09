const express = require("express");
const cors = require("cors");
const app = express();
const User = require('./models/user.model')
require('dotenv').config()
const { mongoose } = require('mongoose');

// Middleware to parse incoming requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Middleware to handle CORS
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:3000",
  })
);


app.get("/test", (req, res) => {
  res.json("Test Works");
});

// Register Route
app.post("/register", async (req, res) => {
  const { username, email, password,firstName, lastName, address, phone, food } = req.body;

  if (!firstName || !lastName || !username || !email || !password || !phone || !address || !food) {
      return res.status(403).json({ message: "All fields are required." });
  }

  try {
      const newUser = new User({username, email, password, firstName, lastName,address, phone, food });
      await newUser.save();
      res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
      res.status(500).json({ message: error.message });
  }
});

mongoose.connect(process.env.MONGO_URL)
  .then(() => {
    console.log('Connected to database');
    //   first connect to db and then run server
    app.listen(4000, () => {
      console.log('Server is running on http://localhost:4000')
    });
  })
  .catch(() => {
    console.log('Connection failed');
  });


