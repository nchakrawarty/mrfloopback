'use strict';

module.exports = {

  VerifyToken: function(req, res) {
    // res.send('req');
    try {
      var accessToken = 'FGHKF5765KHGF';
      var token = req.query['hub.verify_token'];
      var challenge = req.query['hub.challenge'];
      if (challenge != null && token != null && token == accessToken) {
        res.send(challenge);
      } else {
        // res.status(400).send();
        res.send('WhatsApp token verified.');
      }
    } catch (error) {
      // res.status(400).send();
      console.info(error);
      res.send('WhatsApp token not verified.');
    }
  },
  receivedMessage: function(req, res) {
    // Process the incoming message, interact with GPT-3, and generate a response
    console.info('Recieved');
    res.send('Thank for contacting');
  },
};
