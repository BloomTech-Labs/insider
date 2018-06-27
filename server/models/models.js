const { TWILIO_FROM, STRIPE_KEY, TWILIO_TOKEN, TWILIO_SID } = process.env;

const Twilio = require('twilio');
const stripe = require('stripe')(STRIPE_KEY);
// const URI_YESTERDAY = config.URIs.yesterday;
// const URI_CURRENT = config.URIs.current;

const stripeAuth = (token) => { // eslint-disable-line
  return new Promise((resolve, reject) => { // eslint-disable-line
    return stripe.charges
      .create({
        amount: '0100',
        currency: 'usd',
        description: 'New Transaction',
        source: token,
      })
      .then(response => resolve(response))
      .catch((err) => {
        reject(err);
      });
  }).catch(err => err);
};

const sendSMS = (message, recipient) => {
  const client = new Twilio(TWILIO_SID, TWILIO_TOKEN);
  return client.messages
    .create({
      body: message,
      to: recipient,
      from: TWILIO_FROM,
    })
    .then(response => response)
    .catch(err => err);
};

module.exports = {
  sendSMS,
  stripeAuth,
};
