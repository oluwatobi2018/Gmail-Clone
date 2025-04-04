const nodemailer = require('nodemailer');

const smtpConfig = {
    host: '', // Replace with your SMTP server
    port: 587, // Common port for TLS
    secure: false, // Set to true for port 465, false for other ports
    auth: {
        user: '', // Replace with your email
        pass: '', // Replace with your email password
    },
};

const transporter = nodemailer.createTransport(smtpConfig);

module.exports = transporter;
