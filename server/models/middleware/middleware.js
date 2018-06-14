const {
  TWILIO_FROM,
  STRIPE_KEY,
  TWILIO_TOKEN,
  TWILIO_SID,
} = process.env;

const STATUS_USER_ERROR = 422;

const envCheck = (req, res, next) => {
  if (TWILIO_SID && TWILIO_TOKEN && TWILIO_FROM && STRIPE_KEY) {
    next();
  } else {
    return res.status(STATUS_USER_ERROR).json({
      error: 'Please add SID, Token, and From variable to your .env file.',
    });
  }
};

module.exports = {
  envCheck,
};
