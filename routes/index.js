const Controller = require("../controllers/controller");
const express = require("express");
const router = express.Router();
// const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", Controller.register);

router.use(errorHandler);
module.exports = router;
