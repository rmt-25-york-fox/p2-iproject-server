const express = require("express");
const DonationController = require("../controllers/donationController");
const router = express.Router();

router.get("/", DonationController.getDonations);
router.post("/payment", DonationController.payment);
router.patch("/payment", DonationController.updatePaymentStatus);

module.exports = router;
