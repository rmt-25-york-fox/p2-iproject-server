const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.use(authentication);

module.exports = router;
