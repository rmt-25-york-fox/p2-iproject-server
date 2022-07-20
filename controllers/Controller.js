const { User } = require("../models");
const { comparePassword, signToken } = require("../helpers/helpers");

class Contoller {
  async register(req, res, next) {
    try {
      const { name, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({
        name,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      });
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Unauthorized" };
      }
      if (!comparePassword(password, user.password)) {
        throw { name: "Unauthorized" };
      }

      const access_token = signToken({
        id: user.id,
        email: user.email,
      });
      res.status(200).json({
        access_token,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Contoller;
