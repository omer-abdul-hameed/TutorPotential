const express = require('express');
const router = express.Router();
const db = require('../models'); 
const { hashPassword, comparePassword } = require("../helpers/hash");
const jwt = require("jsonwebtoken");


// Test Route
router.get('/', (req, res) => {
  res.json("test is working");
});

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is required and needs to be 6 characters or longer",
      });
    }
    const exist = await db.User.findOne({ email });
    if (exist) {
      return res.json({
        error: "This email is already in use",
      });
    }
    const hashedPassword = await hashPassword(password);
    const user = await db.User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await db.User.findOne({ email });
    if (!user) {
      return res.json({
        error: "User not found!",
      });
    }

    const match = await comparePassword(password, user.password);
    if (match) {
      jwt.sign(
        { email: user.email, id: user._id, name: user.name },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      res.json({
        error: "Wrong password",
      });
    }
  } catch (error) {
    console.log(error);
  }
});

// Logout
router.get('/logout', (req, res) => {
  res.clearCookie('token'); 
  return res.json({
      message: "Logged out successfully"
  });
});

// Profile
router.get('/profile', (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
});

module.exports = router;
