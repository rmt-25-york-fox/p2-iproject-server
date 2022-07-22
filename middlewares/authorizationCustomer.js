const { Movie } = require("../models");

const authorizationCustomer = async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findByPk(id);

    if (!movie) {
      next({ name: "NotFound" });
    } else {
      if (req.user.role === "Customer") {
        next();
      } else if (req.user.role === "Staff") {
        next({ name: "Forbidden" });
      } else if (req.user.role === "Admin") {
        next({ name: "Forbidden" });
      } else {
        next({ name: "Forbidden" });
      }
    }
  } catch (err) {
    next(err);
  }
};

module.exports = authorizationCustomer;
