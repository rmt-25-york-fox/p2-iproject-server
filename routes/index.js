const express = require("express");
const Controller = require("../controllers/controller");
const authentication = require("../middleware/authentication");
const router = express.Router();

router.post("/register", Controller.register);
router.post("/login", Controller.login);
// router.post("/google-sign-in", Controller.googleSignIn);
router.use(authentication);
router.use("/spaceshuttle", Controller.getInfo);

module.exports = router;
