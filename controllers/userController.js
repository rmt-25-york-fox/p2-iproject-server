const { User } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
let axios = require("axios");
const tokenBoard = require("../helpers/helper");

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
      const tokenStat = await tokenBoard();
      // console.log(tokenStat);
      const access_token = signToken({ id: user.id, email: user.email });
      res.status(200).json({
        access_token,
        username: user.username,
        tokenStat,
      });
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

const tokenLeaderboard = async (req, res, next) => {
  try {
    const grant_type = "client_credentials";
    const scope = "endpoint_client";
    const client_id = "jvOOAmkRowcy4qT8UmnbtOMT4FlVSfZcKO0kalcz";
    const client_secret = "o7WP14JnsVRhHKlm5helhr55rqfMCPE1XBQYGAm8";

    const access_token = await axios.post(
      `https://api.globalstats.io/oauth/access_token`,
      {
        grant_type,
        scope,
        client_id,
        client_secret,
      }
    );
    // console.log(access_token.data);
    const { name, score = 0 } = req.body;
    const data = { name: name, values: { score: score } };
    const create = await axios.post(
      `https://api.globalstats.io/v1/statistics`,
      data,
      {
        headers: {
          Authorization: `Bearer ${access_token.data.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(201).json(create.data);
  } catch (error) {
    next(error);
  }
};

const getLeaderBoard = async (req, res, next) => {
  try {
    const { limit = 10 } = req.body;
    const data = { limit, additionals: ["shots", "time"] };
    const getBoard = await axios.post(
      `https://api.globalstats.io/v1/gtdleaderboard/score`,
      data,
      {
        headers: {
          Authorization: `Bearer ${await tokenBoard()}`,
          "Content-Type": "application/json",
        },
      }
    );
    res.status(201).json(getBoard.data);
  } catch (error) {
    // console.log(error);
    next(error);
  }
};

module.exports = {
  getLeaderBoard,
  tokenLeaderboard,
  getHome,
  register,
  login,
  googleSignIn,
};
