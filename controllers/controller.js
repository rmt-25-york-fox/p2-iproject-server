const { comparePass } = require("../helpers/bcrypt");
const { generateToken, readToken } = require("../helpers/jwt");
const { User, SpaceShuttle } = require("../models");
// const clientId = process.env.CLIENT_ID;
// const { OAuth2Client } = require("google-auth-library");

class Controller {
  static async register(req, res, next) {
    try {
      const { username, email, password } = req.body;
      const newUser = await User.create({
        username,
        email,
        password,
      });
      res.status(201).json({
        statusCode: 201,
        msg: `User with id ${newUser.id} successfully created`,
      });
    } catch (err) {
      next(err);
    }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Unauthorized" };
      }
      const isValidPassword = comparePass(password, user.password);
      if (!isValidPassword) {
        throw { name: "Unauthorized" };
      }
      const payload = { id: user.id };
      const token = generateToken(payload);
      res.status(200).json({ statusCode: 200, access_token: token, email: user.email });
    } catch (err) {
      next(err);
    }
  }

  static async getInfo(req, res, next) {
    try {
      const data = await SpaceShuttle.findAll();
      res.status(200).json(data);
    } catch (err) {
      next(err);
    }
  }

  static async getDetail(req, res, next) {
    try {
      const { id } = req.params;
      const data = await SpaceShuttle.findByPk(id);
      if (data === null) {
        throw { name: "NotFound" };
      }
      res.status(200).json({ data: data });
    } catch (err) {
      next(err);
    }
  }

  static async addNewData(req, res, next) {
    try {
      const { id } = req.user;
      const { name, information, imgUrl } = req.body;
      const newData = await SpaceShuttle.create({
        UserId: +id,
        name,
        information,
        imgUrl,
      });
      const msg = `Data with id ${newData.id} created`;
      res.status(201).json({
        message: msg,
        data: newData,
      });
    } catch (err) {
      next(err);
    }
  }

  static async editInfo(req, res, next) {
    try {
      const { id } = req.params;
      const { name, information, imgUrl } = req.body;
      const updateInfo = await SpaceShuttle.update(
        {
          name,
          information,
          imgUrl,
        },
        { where: { id } }
      );
      const data = await SpaceShuttle.findByPk(id);
      const msg = `SpaceShuttle with id ${data.id} updated`;
      res.status(200).json({
        message: msg,
        data: data,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Controller;
