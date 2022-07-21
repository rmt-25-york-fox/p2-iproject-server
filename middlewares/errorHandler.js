const errorHandler = (err, req, res, next) => {
  console.log(err);
  switch (err.name) {
    // case "USER_NOT_FOUND":
    //   res.status(401).json({ message: "Password or Email incorrect" });
    //   break;

    // case "JsonWebTokenError":
    //   res.status(401).json({ message: "Invalid Token" });
    //   break;

    // case "Forbidden":
    //   res.status(403).json({ message: "You are not authorized" });
    //   break;

    // case "SequelizeForeignKeyConstraintError":
    //   res.status(404).json({ message: "Not Found Guys" });
    //   break;

    // case "SequelizeValidationError":
    //   res.status(400).json({ message: err.errors[0].message });
    //   break;

    // case "SequelizeUniqueConstraintError":
    //   res.status(400).json({ message: err.errors[0].message });
    //   break;

    // case "PRODUCT_NOT_FOUND":
    //   res.status(404).json({ message: "Product not found or deleted" });
    //   break;

    // case "Error":
    //   res.status(401).json({ message: "Email/password invalid" });

    case "Unauthorized":
      res.status(401).json({ message: "Email/password invalid" });
      break;

    default:
      res.status(500).json({ message: "Internal Server Error Ngab!" });
      break;
  }
};

module.exports = errorHandler;
