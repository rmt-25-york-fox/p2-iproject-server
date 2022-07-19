const { User } = require("../models");

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
        message: "Successfully creating new account",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
