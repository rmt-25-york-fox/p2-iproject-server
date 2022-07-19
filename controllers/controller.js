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

  static async postTranskasi(req, res, next) {
    try {
      const { id } = req.user;
      const { liter } = req.body;
      const { petrolId } = req.params;
      console.log(id, liter, petrolId, "<<");
      const gas = await Petrol.findByPk(petrolId);

      if (!gas) {
        throw { name: "Data Not Found" };
      }

      let input = {
        UserId: id,
        PetrolId: petrolId,
        TotalHarga: Math.round(liter * gas.harga),
      };

      const transaksi = await Transaksi.create(input);

      res.status(201).json({
        statuscode: 201,
        data: {
          transaksi,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}
module.exports = Controller;
