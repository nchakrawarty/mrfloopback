'use strict';

module.exports = function (Sendemail) {
    Sendemail.sendTestEmail = function (req, res) {
        Sendemail.app.models.Email.sendEmail(
            'nchakrawarty@gmail.com', // Sender email
            'nripen@tip.agency', // Recipient email
            'Test Email', // Email subject
            'This is a test email.', // Email text
            function (err, info) {
                if (err) {
                    res.status(500).json({ error: 'Error sending email.' });
                } else {
                    res.json({ message: 'Email sent successfully.', info: info });
                }
            }
        );
    };

    Sendemail.remoteMethod('sendEmail', {
        http: { verb: 'get', path: '/send-test-email' },
        returns: { arg: 'data', type: 'object' },
    });
};

