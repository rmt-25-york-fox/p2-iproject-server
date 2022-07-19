"use strict";

const errorHandler = (err, req, res, next) => {
  let code = 500;
  let message = "Internal Server Error";
  const { name } = err;

  if (
    name === "SequelizeValidationError" ||
    name === `SequelizeUniqueConstraintError` ||
    name === `Email and Password cannot be null` ||
    name === `Password must be at least 5 characters`
  ) {
    code = 400;
    message = err.errors[0].message;
  } else if (
    name === "Invalid Email/Password" ||
    name === "Email has been created" ||
    name === `Email is invalid` ||
    name === `Password is invalid`
  ) {
    code = 401;
    message = "Invalid Email/Password";
  } else if (name === "Invalid token" || name === "JsonWebTokenError") {
    code = 401;
    message = "Access Token is Invalid";
  } else if (name === "Forbidden") {
    code = 403;
    message = "You dont Have Access";
  } else if (name === "BadRequest") {
    code = 400;
    message = "Bad Request";
  } else if (name === "Data Not Found" || name === `Movie not found`) {
    code = 404;
    message = "Data Not Found";
  }

  res.status(code).json({
    statusCode: code,
    message: message,
  });
};

module.exports = errorHandler;
