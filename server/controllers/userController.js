"use strict";

const { User } = require("../models");
const { compare } = require("../helpers/bcrypt");
const { payloadToToken } = require("../helpers/jwt");

class UserController {
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw { name: "EmailPasswordEmpty" };
      }

      const foundUser = await User.findOne({
        where: { email },
      });

      if (!foundUser) {
        throw { name: "InvalidAccountDetails" };
      }

      const isPassValid = compare(password, foundUser.password);

      if (!isPassValid) {
        throw { name: "InvalidAccountDetails" };
      }

      const payload = {
        id: foundUser.id,
      };

      const token = payloadToToken(payload);

      res.status(200).json({
        access_token: token,
      });
    } catch (err) {
      next(err);
    }
  }

  static async register(req, res, next) {
    try {
      const { email, password, firstname, lastName, age } = req.body;

      const response = await User.create({
        email,
        password,
        firstname,
        lastName,
        age,
      });

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = UserController;
