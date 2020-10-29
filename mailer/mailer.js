const nodemailer = require("nodemailer");

const mailConfig = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
      user: 'delphine34@ethereal.email',
      pass: 'BkxZb9bakGFaQAgrpt'
  }
});

module.exports = nodemailer.createTransport(mailConfig)