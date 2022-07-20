const snap = require("../helpers/midtrans");
const { Donation } = require("../models");

class DonationController {
  static async payment(req, res, next) {
    try {
      const { name, email, amount, message } = req.body;
      const newDonation = await Donation.create({
        name,
        email,
        amount,
        message
      });

      const transaction = await snap.createTransaction({
        transaction_details: {
          order_id: newDonation.orderId ,
          gross_amount: 100000,
        },
      });
      
      let transactionToken = transaction.token;
      let transactionRedirectUrl = transaction.redirect_url;
      res.status(200).json({
        token: transactionToken,
        redirect_url: transactionRedirectUrl,
      });
    } catch (err) {
      next(err);
    }
  }

  static async paymentStatus(req, res, next) {
    try {
      const { status_code, order_id } = req.body;
      const donation = await Donation.findOne({
        where: {
          order_id,
        },
      });
      if (donation) {
        donation.paymentStatus = status_code;
        await donation.save();
      }
      res.status(200).json({
        message: "Payment status updated",
      });
    } catch (err) {
      next(err);
    }
  }

  static async createDonation(req, res, next) {
    try {
      const { name, email, amount, message } = req.body;
      console.log(name, email, amount, message);
      const newDonation = await Donation.create({
        name,
        email,
        amount,
        message,
      });

      res.status(200).json(newDonation);
    } catch (err) {
      console.log(err);
    }
  }
}

module.exports = DonationController;
