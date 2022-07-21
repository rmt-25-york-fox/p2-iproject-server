const snap = require("../helpers/midtrans");
const { Donation } = require("../models");
const nodemailer = require("nodemailer");
const emailTemplate = require("../helpers/emailTemplate");

class DonationController {
  static async getDonations(req, res, next) {
    try {
      const donations = await Donation.findAll({ where: { paymentStatus: "success" } });
      res.status(200).json(donations);
    } catch (err) {
      next(err);
    }
  }

  static async payment(req, res, next) {
    try {
      const { name, email, amount, message } = req.body;
      const newDonation = await Donation.create({
        name,
        email,
        amount,
        message,
      });

      let parameter = {
        transaction_details: {
          order_id: newDonation.orderId,
          gross_amount: newDonation.amount,
        },
        customer_details: {
          first_name: newDonation.name,
          email: newDonation.email,
        },
        enabled_payments: ["credit_card"],
        credit_card: {
          secure: true,
        },
      };

      const transaction = await snap.createTransaction(parameter);

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

      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "uriel.lubowitz8@ethereal.email", // ethereal user
          pass: "DTd8AhjXEyUGngVbdH", // ethereal password
        },
      });

      const msg = {
        from: '"BackMiUp" <admin@backmiup.com>', // sender address
        to: `${donation.email}`, // list of receivers
        subject: "Thank you for your support!", // Subject line
        html: emailTemplate(donation.name), // html body
      };
      // send mail with defined transport object
      const info = await transporter.sendMail(msg);

      console.log("Message sent: %s", info.messageId);
      // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

      // Preview only available when sending through an Ethereal account
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...

      res.status(200).json({
        message: "Payment status updated",
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = DonationController;
