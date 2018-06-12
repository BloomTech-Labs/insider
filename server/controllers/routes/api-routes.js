require('dotenv').config();
const express = require('express');
const server = express();

const Twilio = require('twilio');

server.use(express.json());

// const User = require('../models/user-model');
// const Message = require('../models/message-model');

server.use(express.json());

server.post('/send', (req, res) => {
  let SID = process.env.TWILIO_SID;
  let TOKEN = process.env.TWILIO_TOKEN;
  let FROM = process.env.TWILIO_FROM;

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
    .then((message) => console.log('Sent message:', message.body))
    .catch((err) => {
      res.send(err);
    });
});

module.exports = server;
