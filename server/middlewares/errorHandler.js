const errorHandler = (err, req, res, next) => {
  console.log(err)
  switch (err.name) {
    case "SequelizeValidationError":
      res.status(400).json({ message: err.errors[0].message });
      break;
    case "SequelizeUniqueConstraintError":
      res.status(400).json({
        message: "Email sudah dpakai, silahkan gunakan email lainnya",
      });
      break;
    case "JsonWebTokenError":
      res.status(401).json({ message: "Invalid Token" });
      break;
    case "EmailRequired":
      res.status(400).json({ message: "Silahkan masukkan email" });
      break;
    case "PasswordRequired":
      res.status(400).json({ message: "Silahkan masukkan password" });
      break;
    case "NotUser":
      res.status(401).json({ message: "Invalid email/password" });
      break;
    default:
      res.status(500).json({ message: "Internal server error" });
      break;
  }
};

module.exports = errorHandler;
