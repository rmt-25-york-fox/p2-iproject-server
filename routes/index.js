const Controller = require("../controllers/controller");
const express = require("express");
const router = express.Router();
const authentication = require("../middlewares/authentication");
const errorHandler = require("../middlewares/errorHandler");

router.post("/register", Controller.register);
router.post("/login", Controller.login);
router.post("/google-sign", Controller.google);

router.use(authentication);

router.get("/petrol", Controller.getPetrol);

router.get("/transaksi", Controller.getTransaksi);

router.post("/transaksi/:petrolId", Controller.postTranskasi);

router.use(errorHandler);
module.exports = router;
