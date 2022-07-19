const express = require("express");
const router = express.Router();
const tutorialRoute = require("./tutorials");
const donationRoute = require("./donations");
const errorHandler = require("../middlewares/errorHandler");

router.use("/tutorials", tutorialRoute);
router.use("/donations", donationRoute);
// router.use(errorHandler);

module.exports = router;
