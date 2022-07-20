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
        message,
      });

      const transaction = await snap.createTransaction({
        transaction_details: {
          order_id: newDonation.orderId,
          gross_amount: newDonation.amount,
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

  static async updatePaymentStatus(req, res, next) {
    try {
      const { orderId } = req.body;
      
      const donation = await Donation.findOne({
        where: {
          orderId,
        },
      });

      if (!donation) {
        throw { name: "NotFound" };
      }

      await donation.update(
        {
          paymentStatus: "success",
        },
        {
          where: {
            orderId,
          },
        }
      );
      res.status(200).json({
        message: "Payment status updated",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DonationController;
