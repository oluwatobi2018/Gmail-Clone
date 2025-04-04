const imap = {
    user: process.env.IMAP_USER || '',
    password: process.env.IMAP_PASSWORD || '',
    host: process.env.IMAP_HOST || '',
    port: process.env.IMAP_PORT || 993,
    tls: true,
};

module.exports = imap;
