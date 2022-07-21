const { tokenToPayload } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "InvalidTokenError" };
    }

    const payload = tokenToPayload(access_token);

    const user = await User.findByPk(payload.id);

    if (!user) {
      throw { name: "InvalidTokenError" };
    }

    req.user = {
      id: user.id,
      email: user.email,
    };

    next();
  } catch (err) {
    next(err);
  }
}

module.exports = authentication;
