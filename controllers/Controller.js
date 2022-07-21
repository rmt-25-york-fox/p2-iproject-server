const {
  User,
  Product,
  UserOrder,
  Order,
  Payment,
  Category,
} = require("../models");
const { comparePassword, signToken } = require("../helpers/helpers");
const axios = require("axios");
const { Op } = require("sequelize");

class Contoller {
  static async register(req, res, next) {
    try {
      const { name, email, password, phoneNumber, address } = req.body;
      const newUser = await User.create({
        name,
        email,
        password,
        phoneNumber,
        address,
      });
      res.status(201).json({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
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
      if (!comparePassword(password, user.password)) {
        throw { name: "Unauthorized" };
      }

      const access_token = signToken({
        id: user.id,
        email: user.email,
      });
      res.status(200).json({
        access_token,
        email: user.email,
      });
    } catch (err) {
      next(err);
    }
  }

  static async addUserOrder(req, res, next) {
    try {
      const { productId } = req.params;
      const userId = req.user.id;
      const product = await Product.findByPk(+productId);
      if (!product) throw { name: "NotFound" };
      UserOrder.create({ UserId: userId, ProductId: product.id });
      res.status(201).json({ message: "Add Successful" });
    } catch (err) {
      next(err);
    }
  }

  static async getUserOrder(req, res, next) {
    try {
      const userId = req.user.id;
      const userOrder = await UserOrder.findAll({
        where: { UserId: userId },
        include: [{ model: Product, include: [{ model: Category }] }],
      });
      let totalOrder = 0;
      userOrder.forEach((el) => {
        totalOrder += el.Product.price;
      });
      res.status(200).json({ userOrder, totalOrder });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async payment(req, res, next) {
    try {
      const { totalOrder } = req.query;
      const userId = req.user.id;
      const user = await User.findByPk(+userId);
      if (!user) throw { name: "NotFound" };
      const response = await axios({
        method: "POST",
        url: "https://api.sandbox.midtrans.com/v1/payment-links",
        headers: {
          Authorization: process.env.MID_API,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: {
          payment_type: "qris",
          transaction_details: {
            order_id: user.id + "-" + new Date().getTime().toString(),
            gross_amount: totalOrder,
          },
          customer_details: {
            first_name: user.name,
            email: user.email,
            phone: user.phoneNumber,
            notes:
              "Thank you for your purchase. Please follow the instructions to pay.",
          },
        },
      });
      const payment = await Payment.create({
        paymentUrl: response.data.payment_url,
        UserId: userId,
      });
      UserOrder.destroy({ where: { UserId: userId } });
      Order.create({ UserId: userId });
      res.status(200).json({ payment, order_id: response.data.order_id });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  static async getProduct(req, res, next) {
    try {
      const { name } = req.query;
      const options = {
        include: [{ model: Category, where: {} }],
      };
      if (name) {
        options.include[0].where.name = {
          [Op.eq]: name,
        };
      }
      const product = await Product.findAll(options);
      res.status(200).json(product);
    } catch (err) {
      next(err);
    }
  }

  static async getCategory(req, res, next) {
    try {
      const category = await Category.findAll();
      res.status(200).json(category);
    } catch (err) {
      next(err);
    }
  }

  static async getDeliveryCost(req, res, next) {
    try {
      const { destination, courier } = req.body;
      const origin = 9;
      const weight = 1;
      const response = await axios({
        method: "POST",
        url: "https://api.rajaongkir.com/starter/cost",
        headers: {
          key: process.env.R_K_API,
        },
        data: {
          origin,
          destination,
          weight,
          courier,
        },
      });
      res.status(200).json({ data: response.data.rajaongkir.results });
    } catch (err) {
      next(err);
    }
  }

  static async checkPaymentStatus(req, res, next) {
    try {
      const { id } = req.user;
      const status = await Order.findOne({ where: { UserId: id } });
      res.status(200).json({ status });
    } catch (err) {
      next(err);
    }
  }

  static async handleStatusPayment(req, res, next) {
    try {
      const { id } = req.user;
      const status = await Order.update(
        { status: "Settlement" },
        { where: { UserId: id } }
      );
      res.status(200).json({ message: "Payment Successful" });
    } catch (err) {
      next(err);
    }
  }

  static async deleteOrder(req, res, next) {
    try {
      const { id } = req.params;
      const temp = await UserOrder.destroy({ where: { id } });
      res.status(200).json({ message: "Delete Successfull" });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = Contoller;
