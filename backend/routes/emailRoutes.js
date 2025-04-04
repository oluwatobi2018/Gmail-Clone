const express = require('express');
const { fetchEmails } = require('../services/imapService');
const { sendEmail } = require('../services/smtpService');

const router = express.Router();

// Route to fetch unread emails
router.get('/', async (req, res) => {
  try {
    const emails = await fetchEmails();
    res.json(emails);
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});

// Route to send an email
router.post('/send', async (req, res) => {
  const { to, subject, text } = req.body;
  try {
    await sendEmail(to, subject, text);
    res.status(200).json({ message: 'Email sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = router;