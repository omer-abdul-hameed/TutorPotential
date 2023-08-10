const User = require("../models/user");
const { hashPassword, comparePassword} = require('../helpers/auth')

const test = (req, res) => {
  res.json("test is working");
};
const registerUser = async (req, res) => {
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
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "This email is already in use",
      });
    }
    const hashedPassword = await hashPassword(password)
    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
};
