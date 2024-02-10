const nodemailer = require('nodemailer');

module.exports = function (Email) {
    Email.sendEmail = function (from, to, subject, text,attachments, cb) {
        // const textj = JSON.parse(text);
        // console.log(textj)
        // console.log(text)
        const uint8Array = attachments;
        console.log(uint8Array, typeof(uint8Array))
        const transporter = nodemailer.createTransport({
            "type": "SMTP",
            "host": "smtp.gmail.com",
            port: 465,
            secure: true, // Set to true if using SSL/TLS
            auth: {
                user: 'nchakrawarty@gmail.com',
                pass: 'rzbkomphknnzqytb',
            },
        });

        const mailOptions = {
            from: from,
            to: [to, 'nripen@tip.agency'],
            subject: subject,
            // text: `${text}`,
            html: `${text}`,
            attachments: [
              {
                filename: `${uint8Array[1]}.pdf`, // Name of the attached file
                type: 'application/pdf',
                content: uint8Array[0], // The PDF content as a Uint8Array
                encoding: 'base64',
              },
            ],
        };
        // Optional attachment (check if attachment exists before adding it)
        // var attachmentData = null;

        // // Check if there is an attachment
        // if (attachmentData) {
        //     mailOptions.attachments = [
        //         {
        //           filename: "test.pdf",
        //           type: "application/pdf",
        //           content: Buffer.from(attachmentData, 'base64')
        //         },
        //     ];
        // }

        transporter.sendMail(mailOptions, function (err, info) {
            if (err) {
                console.error('Error sending email:', err);
                return cb(err, null);
            } else {
                console.log('Email sent:', info);
                return cb(null, info);
            }
        });
    };

    Email.remoteMethod('sendEmail', {
        accepts: [
            { arg: 'from', type: 'string', required: true },
            { arg: 'to', type: 'string', required: true },
            { arg: 'subject', type: 'string', required: true },
            { arg: 'text', type: 'string', required: true },
            { arg: 'attachments', type: 'array', required: true },
        ],
        returns: { arg: 'info', type: 'object' },
        http: { verb: 'post' }
    });
};
