const { comparePassword } = require("../helpers/bcrypt");
const { signPayload } = require("../helpers/jwt");
const { User } = require("../models/index");

class UserController {
  static home(req, res) {
    res.send("Hello World, Success Deploy!");
  }

  static async postRegister(req, res, next) {
    try {
      const { email, password } = req.body;
      const newUser = await User.create({
        email,
        password,
      });

      res.status(201).json({
        id: newUser.id,
        email: newUser.email,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async postLogin(req, res, next) {
    try {
      const { email, password } = req.body;
      const findUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!findUser) {
        throw { name: "Unauthorized" };
      }

      const checkPassword = comparePassword(password, findUser.password);

      if (!checkPassword) {
        throw { name: "Unauthorized" };
      }

      const payload = {
        id: findUser.id,
        email: findUser.email,
      };

      const token = signPayload(payload);

      res.status(200).json({
        id: payload.id,
        access_token: token,
      });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
}

module.exports = UserController;
