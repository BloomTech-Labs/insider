const { TWILIO_FROM, STRIPE_KEY, TWILIO_TOKEN, TWILIO_SID } = process.env;

const Twilio = require('twilio');
const stripe = require('stripe')(STRIPE_KEY);
const fs = require('fs');
const path = require('path');

const stripeAuth = (token) => {
  // eslint-disable-line
  return new Promise((resolve, reject) => {
    // eslint-disable-line
    return stripe.charges
      .create({
        amount: '0100',
        currency: 'usd',
        description: 'New Transaction',
        source: token,
      })
      .then(response => resolve(response))
      .catch((err) => {
        console.error(err);
        reject(err);
      });
  }).catch((err) => {
    console.error(err);
    return err;
  });
};

const sendSMS = (message, recipient) => {
  const client = new Twilio(TWILIO_SID, TWILIO_TOKEN);
  return client.messages
    .create({
      body: message,
      to: recipient,
      from: TWILIO_FROM,
    })
    .then((response) => {
      console.log(response);
      return response;
    })
    .catch((err) => {
      console.error(err);
      return err;
    });
};
const messagesFeed = () => {
  const client = new Twilio(TWILIO_SID, TWILIO_TOKEN);
  const limit = 10;
  const arr = {
    messages: [],
  };

  client.messages.each({ limit }, (msg) => {
    const { dateCreated, body, sid } = msg;
    const message = {
      body,
      dateCreated,
      sid,
    };
    arr.messages.push(message);
    if (arr.messages.length === limit) {
      const content = JSON.stringify(arr);
      const filePath = path.join(__dirname, '/messages/', 'messages.json');
      fs.writeFile(filePath, content, (err) => {
        if (err) {
          console.error(err);
        }
        console.log('messages saved');
      });
    }
  });
};

module.exports = {
  sendSMS,
  stripeAuth,
  messagesFeed,
};
