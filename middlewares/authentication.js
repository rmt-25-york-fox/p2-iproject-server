"use strict";

const { verifyJwt } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { access_token } = req.headers;
    console.log(access_token);

    if (!access_token) {
      throw { name: "Invalid token" };
    }

    const payload = verifyJwt(access_token);
    const { id } = payload;
    const user = await User.findByPk(id);

    if (!user) {
      throw { name: "InvalidToken" };
    }

    req.user = {
      id: user.id,
    };

    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authentication;
