const { User, Access_Token, DigimonUser, Digimon } = require("../models");
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
      const grant_type = "client_credentials";
      const scope = "endpoint_client";
      const client_id = process.env.client_id;
      const client_secret = process.env.client_secret;

      const access_token = await axios({
        method: "post",
        url: "https://api.globalstats.io/oauth/access_token",
        data: {
          grant_type,
          scope,
          client_id,
          client_secret,
        },
      });

      const data = await Access_Token.create({
        UserId: user.id,
        access_token: access_token.data.access_token,
      });

      res.status(200).json({ access_token: token, data });
    } catch (err) {
      next(err);
    }
  }

  static async fetchDigimons(req, res, next) {
    try {
      const response = await axios.get(
        "https://digimon-api.vercel.app/api/digimon"
      );
      // if ((await Digimon.findAll().length) == "undefined") {
      //   await Digimon.bulkCreate(response.data);
      // }
      const tryFetch = await Digimon.findAll()
      if (tryFetch.length == 'undefined') {
        await Digimon.bulkCreate(response.data)
      }
      const digimon = await Digimon.findAll();
      res.status(200).json(digimon);
    } catch (err) {
      next(err);
    }
  }

  static async fetchSearchedDigimon(req, res, next) {
    try {
      const { name } = req.params;
      const response = await axios.get(
        `https://digimon-api.vercel.app/api/digimon/name/${name}`
      );
      res.status(200).json(response.data);
    } catch (err) {
      next(err);
    }
  }

  static async createUserGlobalStats(req, res, next) {
    try {
      const { name, score = 0 } = req.body;
      if (!name) next({ name: "NameRequired" });
      const data = {
        name: name,
        values: {
          score: score,
        },
      };

      const access_token = await Access_Token.findAll({
        limit: 1,
        order: [["createdAt", "desc"]],
      });

      const createUserStats = await axios.post(
        `https://api.globalstats.io/v1/statistics`,
        data,
        {
          headers: {
            Authorization: `Bearer ${access_token[0].access_token}`,
          },
        }
      );
      res.status(201).json(createUserStats.data);
    } catch (err) {
      next(err);
    }
  }

  static async displayLeaderboard(req, res, next) {
    try {
      const data = {
        limit: 100,
        additionals: ["score"],
      };

      const access_token = await Access_Token.findAll({
        limit: 1,
        order: [["createdAt", "desc"]],
      });

      const leaderboard = await axios.post(
        `https://api.globalstats.io/v1/gtdleaderboard/score`,
        data,
        {
          headers: { Authorization: `Bearer ${access_token[0].access_token}` },
        }
      );
      res.status(200).json(leaderboard.data);
    } catch (err) {
      next(err);
    }
  }

  static async winnerPrize(req, res, next) {
    try {
      const { id } = req.user;
      const { digiId } = req.params;
      const findDigi = await Digimon.findByPk(digiId);
      if (!findDigi) next({ name: "DigiNotFound" });
      const userDigimon = await DigimonUser.create({
        UserId: id,
        DigimonId: digiId,
      });
      res.status(201).json({
        UserId: userDigimon.UserId,
        DigiId: userDigimon.DigimonId,
      });
    } catch (err) {
      next(err);
    }
  }

  static async showMyDigimons(req, res, next) {
    try {
      const { id } = req.user;
      const response = await DigimonUser.findAll({
        where: {
          UserId: id,
        },
        include: {
          model: Digimon,
        },
      });
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
