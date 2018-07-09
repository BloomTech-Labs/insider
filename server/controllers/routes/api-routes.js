const express = require('express');
const Twilio = require('twilio');
const morgan = require('morgan');
const path = require('path');

const server = express();
server.use(morgan('combined'));

server.use(express.json());

const STATUS_SUCCESS = 200;
const SERVER_ERROR = 500;

const { stripeAuth, sendSMS, messagesFeed } = require('../../models/models');

// Handles POST api call, sends token to Stripe
// waits for CC auth and then sends on the message
// content to Twilio if CC Auth is successful.
if (process.env.DEV !== 'development') {
  express.get('*', (req, res) => {
    messagesFeed();
    res
      .status(STATUS_SUCCESS)
      .sendFile(path.join(__dirname, '../client/build/index.html'));
  });
}

server.post('/send', (req, res) => {
  const { token } = req.body;
  const { message, recipient } = req.body;

  stripeAuth(token)
    .then((stripeData) => {
      // Because these functions (stripeAuth and sendSMS) work one after another
      // every time, I had to use promises to ensure the twilio message doesn't
      // get sent until the Stripe Auth returns. Because of this, the errors
      // don't always return properly from the functions. This necessitates
      // checking for the status code when the function returns and then
      // returning the errors correctly.

      // The benefit of this is we can pass along the status codes and error
      // messages from Stripe and Twilio

      if (stripeData.statusCode > 204) {
        res.status(stripeData.statusCode).json({ error: stripeData.message });
      }
      sendSMS(message, recipient).then((data) => {
        if (data.status > 204) {
          res.status(data.status).json({ error: data.message });
        } else {
          messagesFeed();
          res
            .status(STATUS_SUCCESS)
            .json({ success: 'Your message was successfully sent.' });
        }
      });
    })
    .catch(error => res.status(SERVER_ERROR).json({ error }));
});

// Twilio GET api call (10 last messages)
// server.get('/recent-messages', (req, res) => {

// const { TWILIO_TOKEN, TWILIO_SID } = process.env;
// const client = new Twilio(TWILIO_SID, TWILIO_TOKEN);
// const limit = 10;
// const arr = [];
// // Uses Twilio's built in function to get recent messages
// client.messages.each({ limit }, (msg) => {
//   const { dateCreated, body, sid } = msg;
//   const message = {
//     body,
//     dateCreated,
//     sid,
//   };
//   arr.push(message);
//   if (arr.length === limit) res.status(STATUS_SUCCESS).json(arr);

// });
// });

module.exports = server;
