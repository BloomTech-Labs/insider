const express = require('express');
const Twilio = require('twilio');
const morgan = require('morgan');
// const config = require('../../config.js');

const server = express();
server.use(morgan('combined'));

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
      res
        .status(STATUS_SUCCESS)
        .json({ success: 'Your message was successfully sent.' });
    })
    .catch(error => res.status(SERVER_ERROR).json({ error }));
});

server.get('/recent-messages', (req, res) => {
  const { TWILIO_TOKEN, TWILIO_SID } = process.env;
  const client = new Twilio(TWILIO_SID, TWILIO_TOKEN);
  const limit = 10;
  const arr = [];
  client.messages.each({ limit }, (msg) => {
    arr.push(msg);
    if (arr.length === limit) res.status(STATUS_SUCCESS).json(arr);
  });
});

module.exports = server;
