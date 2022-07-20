const express = require("express");
const DonationController = require("../controllers/donationController");
const router = express.Router();

router.post("/", DonationController.createDonation);
router.post("/payment", DonationController.payment);

module.exports = router;
