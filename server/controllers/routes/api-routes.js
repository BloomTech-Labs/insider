const express = require('express');
// const config = require('../../config.js');

const server = express();
server.use(express.json());

const STATUS_SUCCESS = 200;
const SERVER_ERROR = 500;

const { stripeAuth, sendSMS } = require('../../models/models');

// const User = require('../models/user-model');
// const Message = require('../models/message-model');

server.post('/send', (req, res) => {
  const { token } = req.body;
  const { message, recipient } = req.body.message;

  stripeAuth(token)
    .then(() => sendSMS(message, recipient))
    .then(() => {
      res.status(STATUS_SUCCESS).json({ success: 'Your message was successfully sent.' });
    })
    .catch(error => res.status(SERVER_ERROR).json({ error }));
});

module.exports = server;
