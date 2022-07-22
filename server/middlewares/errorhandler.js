function errorHandler(err, req, res, next) {
  let code = 500;
  let message = "Internal Server Error";
  console.log(err);

  if (err.name === "SequelizeValidationError") {
    code = 400;
    message = err.errors[0].message;
  } else if (err.name === "EmailPasswordEmpty") {
    code = 401;
    message = "Email/Password cannot empty";
  } else if (err.name === "InvalidAccountDetails") {
    code = 401;
    message = "Email/Password Invalid";
  } else if (err.name === "InvalidTokenError" || "JsonWebTokenError") {
    code = 401;
    message = "Invalid Access Token";
  }
  res.status(code).json({ message });

  next();
}

module.exports = errorHandler;
