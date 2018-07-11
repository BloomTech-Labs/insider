const express = require('express');
const morgan = require('morgan');

const server = express();
server.use(morgan('combined'));

server.use(express.urlencoded({ extended: true }));

const STATUS_SUCCESS = 200;

const { messagesFeed } = require('../../models/models');

server.post('/twilio-status', (req, res) => {
  const { MessageStatus } = req.body;
  if (MessageStatus === 'sent') {
    messagesFeed();
    console.log(req.body);
  }
  res.sendStatus(STATUS_SUCCESS);
});

module.exports = server;
