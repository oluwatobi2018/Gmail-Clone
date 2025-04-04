const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configure SMTP transport for Axigen
const transporter = nodemailer.createTransport({
  host: "mail.snaarp.com", // Replace with your Axigen server address
  port: 587, // Default SMTP port
  secure: false, // Use true for 465, false for other ports
  auth: {
    user: "project@snaarp.com", // Replace with Axigen email
    pass: "Snaarp@123", // Replace with Axigen password
  },
});

// Endpoint to send email
app.post("/api/send", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await transporter.sendMail({
      from: "hello@snaarp.com", // Sender address
      to, // List of recipients
      subject, // Subject line
      text, // Plain text body
    });
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email.");
  }
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));