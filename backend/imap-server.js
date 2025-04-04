const Imap = require('imap-simple');

const config = {
  imap: {
    user: 'your-email@example.com',
    password: 'your-password',
    host: 'mail.example.com',
    port: 993, // IMAP Secure port
    tls: true,
    authTimeout: 3000,
  },
};

async function checkInbox() {
  const connection = await Imap.connect(config);
  await connection.openBox('INBOX');
  
  const searchCriteria = ['UNSEEN']; // Fetch unread emails
  const fetchOptions = { bodies: ['HEADER', 'TEXT'], markSeen: false };

  const messages = await connection.search(searchCriteria, fetchOptions);

  messages.forEach((msg) => {
    console.log('Email Subject:', msg.parts[0].body.subject[0]);
  });

  connection.end();
}

checkInbox();
