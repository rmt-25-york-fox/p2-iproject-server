const errorHandler = (err, req, res, next) => {
  // console.log(err);
  switch (err.name) {
    case "SequelizeUniqueConstraintError":
      res.status(400).json({
        message: "Your Email Address is Already Registered",
      });
      break;
    case "SequelizeForeignKeyConstraintError":
      res.status(400).json({
        message: "Data not found! Or you type the wrong address",
      });
      break;
    case "User Not Found":
      res.status(401).json({ message: "Invalid username/password" });
      break;
    case "Invalid Request":
      res.status(400).json({ message: "Oopss! Invalid Request" });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Please login first!" });
      break;
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors.map((el) => el.message) });
      break;
    case "Pokemon Not Found":
      res.status(404).json({ message: "Product Not Found" });
      break;
    case "Forbidden":
      res.status(403).json({ message: "You are not authorized" });
      break;
    case "EmailRequired":
      res.status(400).json({ message: "Email is required" });
      break;
    case "PasswordRequired":
      res.status(400).json({ message: "Password is required" });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
};

module.exports = errorHandler;
