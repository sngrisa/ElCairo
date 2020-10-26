const nodemailer = require('nodemailer');

const mailConfig = {
  host: 'smtp.ethereal.email',
  port: 587,
  auth: {
    user: 'pete.durgan@ethereal.email',
    pass: '2z9An7hAqWYebtqJTx'
  }
};

module.exports = nodemailer.createTransport(mailConfig);