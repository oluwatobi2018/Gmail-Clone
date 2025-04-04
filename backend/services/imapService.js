const express = require('express');
const Imap = require('imap-simple');
const cors = require('cors');

const app = express();
app.use(cors()); // Allow requests from the frontend
app.use(express.json()); // Parse JSON request bodies

const config = {
  imap: {
    user: '', // Replace with your Axigen email
    password: '', // Replace with your Axigen password
    host: '', // Replace with your Axigen IMAP server address
    port: 993, // IMAP Secure port
    tls: true,
    authTimeout: 3000,
  },
};

// API endpoint to fetch unread emails
app.get('/api/emails', async (req, res) => {
  try {
    const connection = await Imap.connect(config);
    await connection.openBox('INBOX');

    const searchCriteria = ['UNSEEN']; // Fetch unread emails
    const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: false };

    const messages = await connection.search(searchCriteria, fetchOptions);

    const emails = messages.map((msg) => ({
      subject: msg.parts[0].body.subject[0],
      from: msg.parts[0].body.from[0],
      date: msg.parts[0].body.date[0],
    }));

    connection.end();
    res.json(emails); // Send emails as JSON response
  } catch (error) {
    console.error('Error fetching emails:', error);
    res.status(500).json({ error: 'Failed to fetch emails' });
  }
});

// Function to log unread emails to the console
async function checkInbox() {
  try {
    const connection = await Imap.connect(config);
    await connection.openBox('INBOX');

    const searchCriteria = ['UNSEEN']; // Fetch unread emails
    const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: false };

    const messages = await connection.search(searchCriteria, fetchOptions);

    messages.forEach((msg) => {
      console.log('Email Subject:', msg.parts[0].body.subject[0]);
    });

    connection.end();
  } catch (error) {
    console.error('Error checking inbox:', error);
  }
}

// Start the server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`IMAP server running on port ${PORT}`);
  checkInbox(); // Optionally call checkInbox when the server starts
});
