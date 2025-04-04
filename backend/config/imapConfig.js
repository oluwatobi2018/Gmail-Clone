const imap = {
    user: process.env.IMAP_USER || 'project@snaarp.com',
    password: process.env.IMAP_PASSWORD || 'Snaarp@123',
    host: process.env.IMAP_HOST || 'mail.snaarp.com',
    port: process.env.IMAP_PORT || 993,
    tls: true,
};

module.exports = imap;