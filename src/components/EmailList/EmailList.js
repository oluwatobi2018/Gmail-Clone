// filepath: c:\Users\Oluwatobirc\Documents\Gmail-Clone\src\components\EmailList\EmailList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EmailList() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/emails');
        setEmails(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching emails:', error);
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) {
    return <p>Loading emails...</p>;
  }

  return (
    <div>
      <h2>Inbox</h2>
      <ul>
        {emails.map((email, index) => (
          <li key={index}>
            <p><strong>Subject:</strong> {email.subject}</p>
            <p><strong>From:</strong> {email.from}</p>
            <p><strong>Date:</strong> {email.date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default EmailList;