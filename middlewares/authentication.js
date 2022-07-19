"use strict";

const { verifyJwt } = require("../helpers/jwt");
const { User } = require("../models");

const authentication = async (req, res, next) => {
  try {
    const { accesstoken } = req.headers;

    if (!accesstoken) {
      throw { name: "Invalid token" };
    }

    const payload = verifyJwt(accesstoken);
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
