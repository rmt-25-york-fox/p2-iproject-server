"use strict";
const { verify } = require("jsonwebtoken");
const { User } = require("../models");

const authentication = async function (req, res, next) {
  try {
    const { access_token } = req.headers;
    const payloadData = verify(access_token, "SECRET");
    const user = await User.findByPk(payloadData);

    if (!user) {
      throw { name: "invalidToken" };
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (err) {
    console.log(err);
    if (err.name === "invalidToken") {
      res.status(401).json({
        message: "Invalid token",
      });
    }
  }
};

module.exports = authentication;
