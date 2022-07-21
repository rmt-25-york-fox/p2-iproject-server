const express = require("express");
const router = express.Router();
const tutorialRoute = require("./tutorials");
const donationRoute = require("./donations");
const livechatRoute = require("./livechat");
const errorHandler = require("../middlewares/errorHandler");

router.use("/tutorials", tutorialRoute);
router.use("/donations", donationRoute);
router.use("/livechats", livechatRoute);
router.use(errorHandler);

module.exports = router;
