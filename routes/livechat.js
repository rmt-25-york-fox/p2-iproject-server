const express = require("express");
const router = express.Router();
const LivechatController = require("../controllers/livechatController");

router.post("/", LivechatController.livechat);

module.exports = router;
