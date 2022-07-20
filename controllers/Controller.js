const { User, Product, UserOrder, Order, Payment } = require("../models");
const { comparePassword, signToken } = require("../helpers/helpers");
const axios = require("axios");

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
        include: [{ model: Product }],
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
      const userOrder = await UserOrder.findAll({
        where: { UserId: userId },
        include: [{ model: Product }],
      });
      const data = {
        transaction_details: {
          order_id: user.id + new Date(),
          gross_amount: totalOrder,
        },
        enabled_payments: ["gopay", "bca_va"],
        item_details: userOrder,
        customer_details: {
          first_name: user.name,
          last_name: user.name,
          email: user.email,
          phone: user.phoneNumber,
          notes: "Thank you for your purchase!",
        },
      };
      const response = await axios({
        method: "post",
        url: "https://api.sandbox.midtrans.com/v1/payment-links",
        headers: {
          Authorization:
            "Basic U0ItTWlkLXNlcnZlci1pSU1iRnZKWTYyeWhhMzFFakFoMFRuVkU6",
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        data: data,
      });
      const payment = await Payment.create({
        paymentUrl: response.data.payment_url,
        UserId: userId,
      });
      UserOrder.destroy({ where: { UserId: userId } });
      res.status(200).json({ payment });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }
}

module.exports = Contoller;
