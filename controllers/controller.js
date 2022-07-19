const { Petrol, Transaksi, User } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, kendaraan } = req.body;
      console.log(email, password, kendaraan, "<<<");

      let input = { email, password, kendaraan };
      const createUser = await User.create(input);

      res.status(201).json({
        statuscode: 201,
        data: {
          message: `User has been created`,
          id: createUser.id,
          email: createUser.email,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
module.exports = Controller;
