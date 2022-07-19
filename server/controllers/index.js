const { User } = require("../models");
const { verifyPassword } = require("../helpers/bcrypt");
const { signPayload } = require("../helpers/jwt");
const axios = require("axios");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) next({ name: "EmailRequired" });
      if (!password) next({ name: "PasswordRequired" });
      const user = await User.create({
        email,
        password,
      });
      res.status(201).json({
        message: "Successfully created a new account",
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) next({ name: "EmailRequired" });
      if (!password) next({ name: "PasswordRequired" });
      const user = await User.findOne({
        where: { email },
      });
      if (!user) next({ name: "NotUser" });
      if (!verifyPassword(password, user.password)) {
        next({ name: "NotUser" });
      }
      const token = signPayload({
        id: user.id,
        email: user.email,
      });
      res.status(200).json({ access_token: token });
    } catch (err) {
      next(err);
    }
  }

  static async fetchDigimons(req, res, next) {
    try {
      const response = await axios.get(
        "https://digimon-api.vercel.app/api/digimon"
      );
      res.status(200).json(response.data);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
