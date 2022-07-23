const { User, Product, Category } = require("../models/index");
const { bcrypt, jwt, getToken } = require("../helper/index");
const nodemailer = require("nodemailer");
class Controller {
  static async Register(req, res) {
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
      res.status(409).json({ message: "Fail to register" });
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
      if (error.name === "error invalid username or email or password") {
        res
          .status(404)
          .json({ message: "error invalid username or email or password" });
      } else {
        res.status(500).json({ message: "ISE" });
      }
    }
  }
  static async getAll(req, res, next) {
    try {
      const products = await Product.findAll();
      res.status(200).json(products);
    } catch (error) {
      res.status(500).json({ message: "ISE" });
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
      if (error.name === "not found detail") {
        res.status(404).json({ message: "Not found product" });
      } else {
        res.status(500).json({ message: "ISE" });
      }
    }
  }
  static getOtp(req, res, next) {
    const { email } = req.body;
    const otp1 = Math.floor(Math.random() * 8);
    const otp2 = Math.floor(Math.random() * 8);
    const otp3 = Math.floor(Math.random() * 8);
    const otp4 = Math.floor(Math.random() * 8);
    const otp = `${otp1}${otp2}${otp3}${otp4}`;
    let mailTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "email",
        pass: "pass appnya google",
      },
    });

    let mailDetails = {
      from: "email ",
      to: email,
      subject: "Test mail",
      text: `Hello customer your otp is ${otp}`,
    };

    mailTransporter.sendMail(mailDetails, function (err, data) {
      if (err) {
        res.status(404).json(err);
        console.log("Error Occurs");
      } else {
        res.status(201).json(otp);
        console.log("Email sent successfully");
      }
    });
  }
}

module.exports = Controller;
