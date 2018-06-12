require('dotenv').config();
const express = require('express');
const Twilio = require('twilio');

const server = express();


server.use(express.json());

// const User = require('../models/user-model');
// const Message = require('../models/message-model');

server.post('/send', (req, res) => {
  const SID = process.env.TWILIO_SID;
  const TOKEN = process.env.TWILIO_TOKEN;
  const FROM = process.env.TWILIO_FROM;

  if (!SID || !TOKEN) {
    return res.json({
      message: 'add TWILIO_SID and TWILIO_TOKEN to .env file.',
    });
  }

  const client = new Twilio(SID, TOKEN);
  client.messages
    .create({
      to: req.body.recipient,
      from: FROM,
      body: req.body.message,
    })
    .then(message => res.status(200).json('Sent message:', message.body))
    .catch((err) => {
      res.send(err);
    });
});

module.exports = server;
