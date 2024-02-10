// Copyright IBM Corp. 2016,2019. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

'use strict';
const path = require('path');
// eslint-disable-next-line max-len
const whatsAppMessage = require(path.resolve(__dirname, '../../common/models/whats-app-message'));

module.exports = function(server) {
  // Install a `/` route that returns server status
  const router = server.loopback.Router();
  router.get('/', server.loopback.status());
  // eslint-disable-next-line no-undef
  router.get('/whatsapp/verify', whatsAppMessage.VerifyToken);
  // eslint-disable-next-line no-undef
  router.post('/whatsapp/receive', whatsAppMessage.receivedMessage);
  server.use(router);
};
