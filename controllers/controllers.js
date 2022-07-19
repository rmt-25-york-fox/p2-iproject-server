const { User, Product, Category } = require("../models/index");
const { bcrypt, jwt, getToken } = require("../helper/index");

class Controller {
  static async Register(req, res, next) {
    try {
      const { username, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({
        username: username,
        email: email,
        password: password,
        phoneNumber: phoneNumber,
        address: address,
      });
      res.status(201).json({
        message: `User dengan id ${newUser.id} successfully created`,
      });
    } catch (error) {
      next(error);
    }
  }
  static async Login(req, res, next) {
    try {
      const { email, password } = req.body;

      const foundUser = await User.findOne({
        where: {
          email,
        },
      });

      if (!foundUser) {
        throw { name: "user not found" };
      }

      const isValidPassword = bcrypt.compareSync(password, foundUser.password);

      if (!isValidPassword) {
        throw { name: "error invalid username or email or password" };
      }
      const payload = { id: foundUser.id };

      const token = getToken(payload);

      res.status(200).json({
        access_token: token,
        username: foundUser.username,
      });
    } catch (error) {
      next(error);
    }
  }
  static async getAll(req, res, next) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      next(error);
    }
  }
  static async selectDetailProduct(req, res, next) {
    try {
      const id = req.params.id;

      const product = await Product.findByPk(id);
      if (!product) {
        throw { name: "not found detail" };
      }
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = Controller;
