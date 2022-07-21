// var nodemailer = require("nodemailer");

// // Create a SMTP transport object
// const transporter = nodemailer.createTransport({
//   service: "hotmail",
//   auth: {
//     user: "space_h8@outlook.com",
//     pass: "Khalifa420",
//   },
// });

// console.log("SMTP Configured");

// // Message object
// var message = {
//   // sender info
//   from: "space_h8@outlook.com",

//   // Comma separated list of recipients
//   to: "sir.adss.23@gmail.com",

//   // Subject of the message
//   subject: "Nodemailer is unicode friendly ",

//   // plaintext body
//   text: "Hello to myself!",

//   // HTML body
//   html: '<p><b>Hello</b> to myself <img src="cid:note@node"/></p>' + "<p>test</p>",
// };

// console.log("Sending Mail");
// transporter.sendMail(message, function (error) {
//   if (error) {
//     console.log("Error occured");
//     console.log(error.message);
//     return;
//   }
//   console.log("Message sent successfully!");

//   // if you don't want to use this transport object anymore, uncomment following line
//   //transport.close(); // close the connection pool
// });

"use strict";
const nodemailer = require("nodemailer");

// async..await is not allowed in global scope, must use a wrapper
async function main() {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "satriohutomo178@gmail.com",
      pass: "khalifa0420", // naturally, replace both with your real credentials or an application-specific password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: "satriohutomo178@gmail.com", // sender address
    to: "sir.adss.23@gmail.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

main().catch(console.error);
