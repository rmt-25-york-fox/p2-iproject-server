const { Petrol, Transaksi, User } = require("../models");
const { bcryptCompare, bcryptHash } = require("../helpers/bcrypt");
const axios = require("axios");
const url = require("url");
const { signJwt, verifyJwt } = require("../helpers/jwt");
const { calculator } = require("../helpers/data");
const { OAuth2Client } = require("google-auth-library");
const { CLIENT_ID, SPBU_API } = process.env;

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
          access_token: token,
          userId: user.id,
          email: user.email,
        },
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async google(req, res, next) {
    try {
      const client = new OAuth2Client(CLIENT_ID);
      const ticket = await client.verifyIdToken({
        idToken: req.headers.credential,
        audience: CLIENT_ID, //process.env.CLIENT_I
      });

      const payload = ticket.getPayload();
      const [user, created] = await Customer.findOrCreate({
        where: { email: payload.email },
        defaults: {
          email: payload.email,
          password: "CobaTebak",
          kendaraan: "Mobil",
        },
        hooks: false,
      });

      const idToken = {
        id: user.id,
      };
      const token = signJwt(idToken);

      res.status(200).json({
        statuscode: 200,
        data: {
          access_token: token,
          userId: user.id,
          userId: created.id,
          email: user.email,
        },
      });
    } catch (err) {
      next(err);
    }
  }

  static async getPetrol(req, res, next) {
    try {
      const petrol = await Petrol.findAll();

      res.status(200).json(petrol);
    } catch (err) {
      next(err);
    }
  }

  static async getTransaksi(req, res, next) {
    try {
      const { id } = req.user;
      const myTransaksi = await Transaksi.findAll({
        where: {
          UserId: id,
        },
        include: {
          model: Petrol,
        },
      });

      res.status(200).json({
        myTransaksi,
      });
    } catch (err) {
      next(err);
    }
  }

  //filter intinya apa yang kita mau
  static async chart(req, res, next) {
    try {
      const { id } = req.user;
      const data = await Transaksi.findAll({
        where: {
          UserId: id,
        },
      });

      let arr = [];
      data.forEach((el) => {
        arr.push(el.dataValues);
      });
      console.log(arr);
      const result = calculator(arr);

      res.status(200).json(result);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async postTranskasi(req, res, next) {
    try {
      const { id } = req.user;
      const { liter, userId } = req.body;
      const { petrolId } = req.params;
      const gas = await Petrol.findByPk(petrolId);
      if (!gas) {
        throw { name: "Data Not Found" };
      }

      let input = {
        UserId: userId,
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
      next(err);
    }
  }

  static async search(req, res, next) {
    try {
      //add api key
      const params = new URLSearchParams({
        access_token: SPBU_API,
        ...url.parse(req.url, true).query,
      });
      const { query } = req.params;
      const result = await axios(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?${params}`
      );
      const data = result.data;
      res.status(200).json(data);
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Controller;
