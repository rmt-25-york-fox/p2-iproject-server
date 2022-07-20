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

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });
    // console.log({ user });
    if (!user) {
      throw { name: "User Not Found" };
    }
    if (!comparePassword(password, user.password)) {
      throw { name: "User Not Found" };
    } else {
      const access_token = signToken({ id: user.id, email: user.email });
      res.status(200).json({ access_token, username: user.username });
    }
  } catch (err) {
    next(err);
  }
};

const googleSignIn = async (req, res, next) => {
  try {
    const { google_token } = req.headers;
    const client = new OAuth2Client(process.env.CLIENT_ID);
    const ticket = await client.verifyIdToken({
      idToken: google_token,
      audience: process.env.CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
      // Or, if multiple clients access the backend:
      //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    const [user, created] = await User.findOrCreate({
      where: {
        email: payload.email,
      },
      defaults: {
        username: payload.name,
        email: payload.email,
        password: "from_google",
      },
      hooks: false,
    });
    const access_token = signToken({
      id: user.id,
      email: user.email,
    });
    // console.log(payload);
    res.status(200).json({
      access_token,
      email: payload.email,
      username: payload.name,
      message: "Success Sign In From Google ",
    });
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = {
  getHome,
  register,
  login,
  googleSignIn,
};
