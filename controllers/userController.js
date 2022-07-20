const { User, Customer } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");

const getHome = async (req, res) => {
  res.send("Welcome Home");
};

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({
      username,
      email,
      password,
    });
    res.status(201).json({
      message: `Success Create User with id: ${newUser.id}`,
      email: newUser.email,
    });
  } catch (err) {
    // console.log(err);
    next(err);
  }
};
