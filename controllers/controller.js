const { comparePass } = require("../helpers/bcrypt");
const { generateToken, readToken } = require("../helpers/jwt");
const { User, SpaceShuttle } = require("../models");
// const clientId = process.env.CLIENT_ID;
// const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        statusCode: 201,
        msg: `User with id ${newUser.id} successfully created`,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
