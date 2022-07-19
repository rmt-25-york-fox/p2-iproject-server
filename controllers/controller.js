const { Petrol, Transaksi, User } = require("../models");
const { bcryptCompare, bcryptHash } = require("../helpers/bcrypt");
const { signJwt, verifyJwt } = require("../helpers/jwt");

class Controller {
  static async register(req, res, next) {
    try {
      const { email, password, kendaraan } = req.body;

      if (email) {
        const findCust = await User.findOne({
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
      console.log(err);
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw { name: "Invalid Email/Password" };
      }

      const validatePassword = bcryptCompare(password, user.password);

      if (!validatePassword) {
        throw { name: "Invalid Email/Password" };
      }

      const payload = {
        id: user.id,
      };

      const token = signJwt(payload);

      res.status(200).json({
        statuscode: 200,
        data: {
          accesstoken: token,
          userId: user.id,
          email: user.email,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getPetrol(req, res, next) {
    try {
      const petrol = await Petrol.findAll();

      console.log(petrol, "<<ini poetrol");

      res.status(200).json({
        statuscode: 200,
        data: {
          petrol,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async getTransaksi(req, res, next) {
    try {
      const { id } = req.user;
      console.log(id);
      const myTransaksi = await Transaksi.findAll({
        where: {
          id,
        },
        include: {
          model: Petrol,
        },
      });
      console.log(myTransaksi, "<<<");

      res.status(200).json({
        statuscode: 200,
        data: {
          myTransaksi,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
module.exports = Controller;
