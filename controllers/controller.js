const { Petrol, Transaksi, User } = require("../models");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, kendaraan } = req.body;

      if (email) {
        const findCust = await Customer.findOne({
          where: {
            email,
          },
        });
        if (findCust) {
          throw { name: `Email has been created` };
        }
      }

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
      next(err);
    }
  }
}
module.exports = Controller;
